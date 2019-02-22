from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, UniqueConstraint, Index, JSON
from sqlalchemy import create_engine

Base = declarative_base()

# engine = create_engine(
#     "mysql+pymysql://root:nishikinomaki556@127.0.0.1:3306/dbtest?charset=utf8",
#     max_overflow=2,
#     pool_size=5,
#     pool_timeout=30,
#     pool_recycle=-1
# )


engine = create_engine(
    "mysql+pymysql://root:Nianshi-2018@127.0.0.1:3306/dbtest?charset=utf8",
    max_overflow=2,
    pool_size=5,
    pool_timeout=30,
    pool_recycle=-1
)


class Accounts(Base):
    __tablename__ = 'Accounts'
    usr_id = Column(Integer, primary_key=True, autoincrement=True)
    usr_name = Column(String(128), index=True)
    usr_open_id = Column(String(128), index=True)
    usr_pwd = Column(String(128), index=True)
    usr_liked = Column(String(128))
    usr_authority = Column(Integer)

    def to_dict(self):
        return {'usr_id': self.usr_id, 'usr_name': self.usr_name, 'usr_open_id': self.usr_open_id,
                'usr_pwd': self.usr_pwd, 'usr_liked': self.usr_liked, 'usr_authority': self.usr_authority}


class Article(Base):
    __tablename__ = 'article'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(128))
    auther = Column(String(128))
    auther_id = Column(String(128))
    numofComment = Column(Integer)
    numofLike = Column(Integer)
    describe = Column(Text(1000))
    image = Column(String(128))
    # comments = Column(Text(1000))
    time = Column(String(128))
    age = Column(Integer)
    type = Column(Integer)
    text = Column(Text(10000))
    investigation = Column(Integer)

    def to_dict(self):
        return {'id': self.id, 'title': self.title, 'author': self.auther, 'author_id': self.auther_id,
                'numofComment': self.numofComment, 'numofLike': self.numofLike, 'describe': self.describe,
                'time': self.time, 'age': self.age, 'type': self.type, 'text': self.text, 'image': self.image,
                'investigation': self.investigation}

    def to_info(self):
        hidden = False
        if len(self.describe) >= 20:
            print(self.describe)
            hidden = True
        return {'id': self.id, 'title': self.title, 'author': self.auther, 'author_id': self.auther_id,
                'numofComment': self.numofComment, 'numofLike': self.numofLike, 'describe': self.describe,
                'time': self.time, 'age': self.age, 'type': self.type, 'image': self.image, 'needHidden': hidden,
                'investigation': self.investigation}


class Events(Base):
    __tablename__ = 'Events'
    event_id = Column(Integer, primary_key=True, autoincrement=True)
    event_name = Column(String(128))
    introduction = Column(Text(1000))
    image = Column(String(128))
    # comments = Column(Text(1000))
    start_time = Column(DateTime)
    terminal_time = Column(DateTime)

    def to_dict(self):
        return {'event_id': self.event_id, 'event_name': self.event_name, 'introduction': self.introduction,
                'start_time': self.start_time, 'terminal_time': self.terminal_time}


def init_db():
    Base.metadata.create_all(engine)


def drop_db():
    Base.metadata.drop_all(engine)


if __name__ == '__main__':
    drop_db()
    init_db()
