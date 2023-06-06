from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class User(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str

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


@app.post("/geeker/estate/list")
def EstateList():
    return {"code": 200, "msg": "成功"}