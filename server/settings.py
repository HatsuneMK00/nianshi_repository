from datetime import timedelta
from sqlalchemy import create_engine

class Config(object):
    SECRET_KEY = '\xa4/\xdf\x9d\xb4[HB\xc6\x8d\xf2\x10J\xe2\x0e\x1a'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    JSON_AS_ASCII = False
    PERMANENT_SESSION_LIFETIME = timedelta(hours=1)


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql://root:Nianshi-2018@localhost:3306/dbtest'
    UPLOAD_FOLDER = 'article_image'
    engine = create_engine(
        "mysql+pymysql://root:Nianshi-2018@127.0.0.1:3306/dbtest?charset=utf8",
        max_overflow=2,
        pool_size=5,
        pool_timeout=30,
        pool_recycle=-1
    )


class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql://root:nishikinomaki556@localhost:3306/dbtest'
    engine = create_engine(
        "mysql+pymysql://root:nishikinomaki556@127.0.0.1:3306/dbtest?charset=utf8",
        max_overflow=2,
        pool_size=5,
        pool_timeout=30,
        pool_recycle=-1
    )