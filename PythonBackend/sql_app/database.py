from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import json

# 从JSON文件中读取数据
with open('sql_app/db_info.json', 'r') as json_file:
    data = json.load(json_file)
    USER = data['user']
    PWD = data['password']
    DB_NAME = data['database']

SQLALCHEMY_DATABASE_URL = f'mysql+mysqlconnector://{USER}:{PWD}@localhost:3306/{DB_NAME}?charset=utf8&auth_plugin=mysql_native_password'
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
