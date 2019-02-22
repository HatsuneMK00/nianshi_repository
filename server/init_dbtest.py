# -*- coding: utf-8 -*

from models import Accounts, Article, Events
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json
from datetime import datetime
import sqlalchemy

engine = create_engine(
    "mysql+pymysql://root:Nianshi-2018@127.0.0.1:3306/dbtest?charset=utf8",
    max_overflow=2,
    pool_size=5,
    pool_timeout=30,
    pool_recycle=-1
)


# engine = create_engine(
#         "mysql+pymysql://root:nishikinomaki556@127.0.0.1:3306/dbtest?charset=utf8",
#         max_overflow=2,
#         pool_size=5,
#         pool_timeout=30,
#         pool_recycle=-1
#     )

def dbtest_init():
    # f = open('article1.txt')
    # str = f.read().decode('ascii').encode('utf-8')
    # f.close()

    Connection = sessionmaker(bind=engine)
    conn = Connection()
    obj1 = Accounts(usr_name='郭省五', usr_authority=1)
    obj2 = Accounts(usr_name='郭省四', usr_authority=1)
    obj3 = Accounts(usr_name='郭省六', usr_authority=1)
    conn.add(obj1)
    conn.add(obj2)
    conn.add(obj3)
    conn.commit()

    conn.close()


def dbtest_init2():
    f = open('article1.txt')
    str = f.read().decode("gbk")
    f.close()

    session = sessionmaker(bind=engine)
    sess = session()
    obj1 = Article(title='我是狗屎', auther='郭省吾', numofComment=0, numofLike=10, describe='我是狗屎',
                   image='ob_jW5QBwNsGQY_cTWQKIzApMqfo',
                   time=datetime.now(), age=1, type=1, text=str, investigation=0)
    obj2 = Article(title='我是狗屎', auther='郭省吾', numofComment=0, numofLike=20, describe='我是狗屎',
                   image='ob_jW5QBwNsGQY_cTWQKIzApMqfo',
                   time=datetime.now(), age=1, type=1, text=str, investigation=0)
    obj3 = Article(title='我是狗屎', auther='郭省吾', numofComment=0, numofLike=0, describe='我是狗屎',
                   image='ob_jW5QBwNsGQY_cTWQKIzApMqfo',
                   time=datetime.now(), age=1, type=1, text=str, investigation=0)
    sess.add(obj1)
    sess.add(obj2)
    sess.add(obj3)
    sess.commit()
    sess.close()


if __name__ == '__main__':
    # dbtest_init()
    dbtest_init2()
