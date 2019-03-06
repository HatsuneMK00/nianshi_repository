from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, UniqueConstraint, Index, JSON, VARCHAR, CHAR
from sqlalchemy import create_engine
import settings

Base = declarative_base()
engine = settings.ProductionConfig.engine

class Accounts(Base):
    __tablename__ = 'Users'
    usr_open_id = Column(VARCHAR(50), index=True, primary_key=True)
    usr_name = Column(VARCHAR(50), index=True)
    usr_pwd = Column(VARCHAR(200), index=True)
    usr_authority = Column(Integer)

    def to_dict(self):
        return {'usr_name': self.usr_name, 'usr_open_id': self.usr_open_id,
                'usr_pwd': self.usr_pwd, 'usr_authority': self.usr_authority}


class Article(Base):
    __tablename__ = 'Articles'
    article_id = Column(Integer, primary_key=True, autoincrement=False)
    title = Column(VARCHAR(50))
    auther_name = Column(VARCHAR(50))
    usr_open_id = Column(VARCHAR(50), index=True)
    like_num = Column(Integer)
    describe = Column(Text(1000))
    time = Column(String(128))
    age = Column(Integer)
    type = Column(Integer)
    text = Column(Text(10000))
    passed = Column(Integer)
    image_num = Column(Integer)
    def to_dict(self):
        return {'title': self.title, 'author': self.auther_name, 'author_id': self.usr_open_id,
                'numofLike': self.like_num, 'describe': self.describe, 'article_id': self.article_id,
                'time': self.time, 'age': self.age, 'type': self.type, 'text': self.text,
                'passed': self.passed, 'image_num':self.image_num}

    def to_info(self):
        hidden = False
        if len(self.describe) >= 20:
            hidden = True
        return {'title': self.title, 'author': self.auther_name, 'author_id': self.usr_open_id,
                'numofLike': self.like_num, 'describe': self.describe,
                'time': self.time, 'age': self.age, 'type': self.type, 'needHidden': hidden,
                'passed': self.passed, 'image_num':self.image_num}


class Events(Base):
    __tablename__ = 'Events'
    event_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    event_name = Column(VARCHAR(50))
    introduction = Column(CHAR(100))
    start_time = Column(VARCHAR(50))
    end_time = Column(VARCHAR(50))

    def to_dict(self):
        return {'event_id': self.event_id, 'event_name': self.event_name, 'introduction': self.introduction,
                'start_time': self.start_time, 'end_time': self.end_time}


class Join(Base):
    __tablename__ = 'Join'
    article_id = Column(Integer, ForeignKey('Articles.article_id'), primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey('Events.event_id'), primary_key=True, index=True)
    usr_open_id = Column(VARCHAR(50), ForeignKey('Users.usr_open_id'), primary_key=True, index=True)

    def to_dict(self):
        return {'event_id': self.event_id, 'article_id': self.article_id, 'usr_open_id': self.usr_open_id}


class ArticleImage(Base):
    __tablename__ = 'ArticleImages'
    article_id = Column(Integer, ForeignKey('Articles.article_id'), primary_key=True)
    image_id = Column(Integer, primary_key=True)
    time = Column(VARCHAR(50))
    url = Column(CHAR(100))

    def to_dict(self):
        return {'article_id': self.article_id, 'image_id': self.image_id, 'time': self.time, 'url': self.url}


class EventImage(Base):
    __tablename__ = 'EventImages'
    event_id = Column(Integer, ForeignKey('Articles.article_id'), primary_key=True, index=True)
    image_id = Column(Integer, primary_key=True)
    time = Column(VARCHAR(50))
    url = Column(CHAR(100))

    def to_dict(self):
        return {'event_id': self.event_id, 'image_id': self.image_id, 'time': self.time, 'url': self.url}


class Like(Base):
    __tablename__ = 'Like'
    article_id = Column(Integer, ForeignKey('Articles.article_id'), primary_key=True, index=True)
    usr_open_id = Column(VARCHAR(50), ForeignKey('Users.usr_open_id'), primary_key=True, index=True)

    def to_dict(self):
        return {'article_id': self.article_id, 'usr_open_id': self.usr_open_id}


class Comment(Base):
    __tablename__ = 'Comments'
    article_id = Column(Integer, ForeignKey('Articles.article_id'), primary_key=True, index=True)
    usr_open_id = Column(VARCHAR(50), ForeignKey('Users.usr_open_id'), primary_key=True, index=True)
    comment = Column(VARCHAR(200))
    time = Column(VARCHAR(50))
    comment_id = Column(Integer, primary_key=True, autoincrement=True)
    like_num = Column(Integer)

    def to_dict(self):
        return {'article_id': self.article_id, 'usr_open_id': self.usr_open_id, 'comment': self.comment,
                'time': self.time, 'comment_id': self.comment_id, 'like_num': self.like_num}


def init_db():
    Base.metadata.create_all(engine)


def drop_db():
    Base.metadata.drop_all(engine)


if __name__ == '__main__':
    drop_db()
    init_db()
