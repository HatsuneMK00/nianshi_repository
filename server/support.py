# -*- coding: utf-8 -*-
from datetime import timedelta
from sqlalchemy import create_engine
import functools
from flask import redirect, session, url_for
import requests
import time
import json
from settings import appid, secret

access_token = ''


# not a good decorator but can use
# must write the '@check_login' right above the func
def check_login_admin(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
        if 'username' not in session:
            return redirect(url_for('login'))
        elif session['username'] == 'admin':
            return func(*args, **kw)
        else:
            return redirect(url_for('multiUpload'))
        # url_for use func name as argument!

    return wrapper


# the json object is tranformed unicode str!
def update_access_token():
    global access_token
    payload = {'appid': appid, 'secret': secret,
               'grant_type': 'client_credential'}
    r = requests.get(
        'https://api.weixin.qq.com/cgi-bin/token', params=payload)
    result = r.json()
    # print(result)
    while 'errcode'.decode('utf-8') in result:
        if result['errcode'.decode('utf-8')] == -1:
            time.sleep(3)
            r = requests.get(
                'https://api.weixin.qq.com/cgi-bin/token', params=payload)
            result = r.json()
        else:
            print("error in appid or secret")
            return -1
    access_token = result['access_token'.decode('utf-8')]


# some bugs
# the content format didn't match
# bugs fixed
# must use json format in post request
# the outer code cannot reach
# the return always be OK
# json.dumps() use unicode as the str format
# should add argument ensure_ascii=False
# should be success
# but i don't understand what is considered as risky content
def check_article_security(article):
    global access_token
    payload = {'content': article.encode('utf-8')}
    payload = json.dumps(payload, ensure_ascii=False)
    # print(article)
    headers = {'Content-Type': 'application/json'}
    req_url = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token={}".format(access_token)
    r = requests.post(req_url, data=payload, headers=headers)
    result = r.json()
    if result['errcode'.decode('utf-8')] == 0:
        return "OK"
    elif result['errcode'.decode('utf-8')] == 87014:
        return "risky"
    else:
        update_access_token()
        req_url = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token={}".format(access_token)
        # print(req_url)
        r = requests.post(req_url, data=payload, headers=headers)
        # print(access_token)
        result = r.json()
        # print(result)
        if result['errcode'.decode('utf-8')] == 0:
            return "OK"
        elif result['errcode'.decode('utf-8')] == 87014:
            return "risky"
        else:
            return "something wrong with the access_token"