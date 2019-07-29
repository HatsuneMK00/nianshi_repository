# -*- coding: utf-8 -*-

from datetime import datetime, timedelta
from flask import Flask, request, render_template, redirect, Response, session, url_for, abort
import os
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Accounts, Article, Events, ArticleImage
from flask import jsonify
from flask import send_file
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
import json
import requests
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import func
import settings
from settings import check_login

engine = settings.ProductionConfig.engine

app = Flask(__name__)
app.config.from_object(settings.ProductionConfig)

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


# app.config中的'UPLOAD_FOLDER'只有在服务器端才可用
@app.route('/', methods=['POST', 'GET'])
def multiUpload():
    if request.method == "GET":
        if 'username' in session:
            return render_template("upload.html", name=session['username'])
        else:
            return redirect(url_for('login'))
    else:
        form = request.form
        upload_files = request.files.getlist("file")  # 获取到上传文件列表
        author = session['username']
        connect = sessionmaker(bind=engine)
        conn = connect()
        usr = conn.query(Accounts).filter_by(usr_name=author).all()[0]
        sql_result = conn.query(func.max(Article.article_id).label('article_id')).one()
        article_id = sql_result.article_id + 1
        # 为满足外码约束 文章要先提交
        obj1 = Article(article_id=article_id, title=form['title'], auther_name=author, like_num=0,
                       describe=form['Introduction'], usr_open_id=usr.usr_open_id,
                       time=datetime.now().strftime("%Y-%m-%d"), age=form['Time'], type=form['Classification'],
                       text=form['article'], image_num=len(upload_files),
                       passed=1)
        conn.add(obj1)
        conn.commit()
        conn.close()

        connect = sessionmaker(bind=engine)
        conn = connect()
        # 保存图片
        # 检查合法文件类型 合法文件名 保存至指定位置
        # 现在不支持在上传文章之后再对图片进行修改
        if len(upload_files) > 0:
            i = 0
            for f in upload_files:
                if allowed_file(f.filename):
                    file_name = str(i) + '_' + str(article_id) + '.' + \
                                f.filename.rsplit('.', 1)[1]
                    print(article_id)
                    obj_img = ArticleImage(article_id=article_id, image_id=i, time=datetime.now().strftime("%Y-%m-%d"),
                                           url=file_name)
                    file_name = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
                    f.save(file_name)
                    conn.add(obj_img)
                    conn.commit()
                    i = i + 1
                else:
                    return "文件类型错误"
        conn.close()
    return "upload complete"


@app.route('/dbtest1')
def dbtest_add():
    param_id = int(request.args.get('id'))

    session = sessionmaker(bind=engine)
    sess = session()
    # low efficiency!!

    all_accounts = sess.query(Accounts).all()

    # for row in all_accounts:
    #     print(row.name)
    #     print(row.pwd)
    #     print(row.article)
    sess.close()

    return jsonify({'name': all_accounts[param_id].name, 'article': all_accounts[param_id].article})


@app.route('/dbtest2/<articleid>')
def dbtest2_article(articleid):
    session = sessionmaker(bind=engine)
    sess = session()

    articles = sess.query(Article).all()
    sess.close()

    result = articles[int(articleid)]

    # want to know the quite way to jsonify a class!!!!
    # jsonify the return will be this reverse version
    return jsonify({'title': result.title, 'auther': result.auther, 'number of comment': result.numofComment,
                    'article': result.text})


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "GET":
        if 'username' in session:
            session.clear()
        return render_template('login.html')
    else:
        user = request.form.get('user')
        pwd = request.form.get('pwd')
        connect = sessionmaker(bind=engine)
        conn = connect()
        if conn.query(Accounts).filter_by(usr_name=user).count() != 0:
            pwd_hash = conn.query(Accounts).filter_by(usr_name=user).all()[0].usr_pwd
            conn.close()
            if check_password_hash(pwd_hash, pwd):
                session['username'] = user
                if user=='admin':
                    return redirect(url_for('admin'))
                else:
                    return redirect(url_for('multiUpload'))
            else:
                return render_template('login.html', error="wrong")  # error不能用中文
        else:
            conn.close()
            return "没有该用户，请去小程序上注册"


@app.route('/imagetest1/<imageid>')
def imageTest(imageid):
    filename = 'static/image{}.jpg'.format(imageid)
    return send_file(filename, mimetype='image/jpg')  # good!


@app.route('/fileUploadTest', methods=["GET", "POST"])
def fileUploadTest():
    if request.method == 'GET':
        return render_template('upload.html')
    else:
        file = request.files['file']
        if file:
            file.save(file.filename)
            return 'success!'
        else:
            return 'fail!'


@app.route('/articleUpload', methods=["GET", "POST"])
def articleUpload():
    if request.method == 'GET':
        return render_template('uploadArticle.html')
    else:
        article = request.data.replace("article", '')
        print(article)
        return "complete"


# @app.route('/submit', methods=["GET", "POST"])
# def submit():
#     if request.method == "GET":
#         return render_template("multiUpload.html")
#     else:
#         print(request.form['author'])
#         return "success"


# 这里需要处理防止同一个人反复注册 具体实现应该在getinfo中 在显示注册页面时先getinfo 注册过不再显示页面
# 根据密码生成哈希散列值，再保存

@app.route('/signUp', methods=['POST'])
def signUp():
    # 处理从微信小程序端传来的注册请求
    result = {}
    if request.method == "POST":
        form = request.json
        print(form)
        session = sessionmaker(bind=engine)
        sess = session()
        if sess.query(Accounts).filter_by(usr_open_id=form['openid']).count() >= 1:
            sess.close()
            result['result'] = 'double sign'
            return jsonify(result)
        else:
            if sess.query(Accounts).filter_by(usr_name=form['author']).count() >= 1:
                sess.close()
                result['result'] = 'same user name'
                return jsonify(result)
            else:
                pwd = generate_password_hash(form['pwd'])
                obj1 = Accounts(usr_name=form['author'], usr_authority=1, usr_open_id=form['openid'], usr_pwd=pwd)
                sess.add(obj1)
                sess.commit()
                sess.close()
                result['result'] = 'success'
                return jsonify(result)


@app.route('/getInfo')
def getInfo():
    openid = request.args.get('openid')
    session = sessionmaker(bind=engine)
    sess = session()
    usr = sess.query(Accounts).filter_by(usr_open_id=openid).all()
    sess.close()
    if len(usr) == 0:
        return json.dumps({'signed': 'false'})
    else:
        return json.dumps({'signed': 'true'})


@app.route('/articleImage')
def getArticleImage():
    image_id = request.args.get('image_id')
    article_id = request.args.get('article_id')
    session = sessionmaker(bind=engine)
    sess = session()
    images = sess.query(ArticleImage).filter_by(article_id=article_id).all()
    sess.close()
    if int(image_id) < len(images):  # 该用户存在即可 同一作者可能存在多篇文章
        image = images[int(image_id)]
        word = image.url

        print(word)
        print(os.getcwd())
        # windows
        # command = "dir " + os.getcwd() + " | " + "findstr " + word
        # output = os.popen(command).read()
        # output = ' '.join(output.split()) # 去除output中的多余空格
        # print(output)
        # file = output.split(' ')[3]
        # return send_file(os.getcwd() + '\\' + file, mimetype='image')

        # centOS
        command = "ls " + app.config['UPLOAD_FOLDER'] + " | " + "grep " + word
        output = os.popen(command).read()
        file = output.strip()
        return send_file(app.config['UPLOAD_FOLDER'] + '/' + file, mimetype='image')


@app.route('/getArticleByLike')
def getArticleByLike():
    session = sessionmaker(bind=engine)
    sess = session()
    articles = sess.query(Article).order_by('like_num desc').all()
    article_list = []
    sess.close()
    if len(articles) != 0:
        for article in articles:
            temp = article.to_info()
            temp['article_id'] = article.article_id
            article_list.append(temp)
    else:
        return "seems like there is no article"
    return jsonify(article_list)


@app.route("/getArticleByType")
def getArticleByType():
    type = request.args.get('type')
    openid = request.args.get('openid')
    session = sessionmaker(bind=engine)
    sess = session()
    article_list = []
    articles = sess.query(Article).filter_by(type=type).all()
    for article in articles:
        usrs = sess.query().filter_by()
    sess.close()
    if len(articles) != 0:
        for article in articles:
            temp = article.to_info()
            temp['article_id'] = article.article_id
            article_list.append(temp)
    else:
        return "no such article"
    return jsonify(article_list)


@app.route("/getArticleByAge")
def getArticleByAge():
    age = request.args.get('age')
    session = sessionmaker(bind=engine)
    sess = session()
    article_list = []
    articles = sess.query(Article).filter_by(age=age).all()
    sess.close()
    if len(articles) != 0:
        for article in articles:
            temp = article.to_info()
            temp['article_id'] = article.article_id
            article_list.append(temp)
    else:
        return "no such article"
    return jsonify(article_list)


@app.route("/getArticleByAuthor")
def getArticleByAuthor():
    author_id = request.args.get('author_id')
    session = sessionmaker(bind=engine)
    sess = session()
    article_list = []
    articles = sess.query(Article).filter_by(usr_open_id=author_id).all()
    sess.close()
    if len(articles) != 0:
        for article in articles:
            temp = article.to_info()
            temp['article_id'] = article.article_id
            article_list.append(temp)
    else:
        return "no such article"
    return jsonify(article_list)


@app.route('/setLike')
def setLike():
    article_id = request.args.get('article_id')
    like = request.args.get('like')
    session = sessionmaker(bind=engine)
    sess = session()
    article = sess.query(Article).get(int(article_id))
    article.like_num = int(like)
    sess.add(article)
    sess.commit()
    sess.close()
    return "update success"


@app.route('/getArticle')
def get_article():
    article_id = request.args.get('id')
    session = sessionmaker(bind=engine)
    sess = session()
    article = sess.query(Article).get(int(article_id))
    sess.close()
    return jsonify(article.to_dict())


# 暂时先从用户入口登入管理员账户
@app.route('/admin')
@check_login
def admin():
    # if 'username' not in session:
    #     return redirect(url_for('login'))
    # get article by authorization
    connection = sessionmaker(bind=engine)
    sess = connection()
    articles_info = []
    articles = sess.query(Article).all()
    sess.close()
    for article in articles:
        articles_info.append(article.to_dict())
    return render_template("admin.html", articles=articles_info)


@app.route('/admin/not_passed')
@check_login
def admin_not_passed():
    connection = sessionmaker(bind=engine)
    sess = connection()
    articles_info = []
    articles = sess.query(Article).filter_by(passed=0).all()
    sess.close()
    for article in articles:
        articles_info.append(article.to_dict())
    return render_template("not_passed.html", articles=articles_info)


@app.route('/admin/passed')
@check_login
def admin_passed():
    connection = sessionmaker(bind=engine)
    sess = connection()
    articles_info = []
    articles = sess.query(Article).filter_by(passed=1).all()
    sess.close()
    for article in articles:
        articles_info.append(article.to_dict())
    return render_template("passed.html", articles=articles_info)


@app.route('/admin_auth/<article_id>')
@check_login
def admin_auth(article_id):
    connection = sessionmaker(bind=engine)
    sess = connection()
    article = sess.query(Article).filter_by(article_id=article_id).all()[0]
    sess.close()
    article_info = article.to_dict()
    return render_template("article_auth.html", article=article_info)


@app.route('/api/accept_article/<article_id>')
def accept_article(article_id):
    update_query = """UPDATE Articles
SET passed=1
WHERE article_id={}"""
    cursor = engine.execute(update_query.format(int(article_id)))
    return "success"


@app.route('/api/reject_article/<article_id>')
def reject_article(article_id):
    update_query = """UPDATE Articles
SET passed=0
WHERE article_id={}"""
    cursor = engine.execute(update_query.format(int(article_id)))
    return "success"


# there is some bugs
# fixed
@app.route('/api/update_article',methods=['POST'])
def update_article():
    form = request.json
    # 这里在服务器端 字符类型是unicode 而在本地是str，因此在服务器端需要用encode对unicode类型进行编码转换为str类型！！！！
    n_article = form['article'].encode('utf-8')
    print(n_article.__class__)
    article_id = form['article_id']
    title = form['title'].encode('utf-8')
    print(title.__class__)
    update_query = """UPDATE Articles
SET `text`='{}',passed=0,`title`='{}'
WHERE article_id={}"""
    update_query = update_query.format(n_article, title, int(article_id))
    print(update_query.__class__)
    engine.execute(update_query)
    return "success"


@app.route('/api/get_liked_article/<openid>')
def get_liked_article(openid):
    select_query = """SELECT `title`,auther_name,Articles.usr_open_id,like_num,`describe`,Articles.article_id,`time`,`age`,`type`,`passed`,image_num
FROM Articles JOIN `Like` ON (Articles.article_id=`Like`.article_id)
WHERE `Like`.usr_open_id='{}'"""
    result = engine.execute(select_query.format(openid))
    article_list = []
    for row in result:
        article_info = {}
        for key in row.keys():
            article_info[key] = row[key]
        article_list.append(article_info)
    return jsonify(article_list)



if __name__ == '__main__':
    app.run()
