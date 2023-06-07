from typing import Union
from pydantic import BaseModel
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from sql_app import crud, models, schemas
from sql_app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

class User(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str

class reqEstateList(BaseModel):
    endTime: str
    pageNum: int
    pageSize: int
    startTime: str
    type: int

@app.post("/geeker/login")
async def login(user: User):
    if (user.username == 'admin' and user.password == 'e10adc3949ba59abbe56e057f20f883e') \
        or (user.username == 'user' and user.password == 'e10adc3949ba59abbe56e057f20f883e'):
        return {"code": 200, "data": Token(access_token="bqddxxwqmfncffacvbpkuxvwvqrhln"), "msg": "成功"}
    else:
        return {"code": 500, "msg": "用户名或密码错误"}

@app.post("/geeker/logout")
def logout():
    return {"code": 200, "msg": "成功"}


# db

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from pprint import pprint
@app.post("/geeker/estate/list")
def EstateList(req: reqEstateList):
    data = crud.get_estates(db, skip=(req.pageNum-1)*req.pageSize, limit=req.pageSize)
    return {"code": 200, "data": data, "msg": "成功"}


'''
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
'''