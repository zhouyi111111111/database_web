from typing import Union
from pydantic import BaseModel


class EstateBase(BaseModel):
    estatename: str
    lug: str
    lat: str
    prvin: str
    city: str
    munici: str
    community: str
    date: str
    price: str
    avgprice: str
    listedprice: str
    arch: str
    floor: str
    farea: str
    duplex: str
    towards: str
    fitment: str
    rate: str
    rightage: str
    elevator: str
    ownership: str
    span: str
    chtime: str
    visitor: str
    star: str
    look: str

class Estate(EstateBase):
    id: str

    class Config:
        orm_mode = True

class EstateCreate(EstateBase):
    pass

class EstateBase(BaseModel):
    name : str
    lng : str
    lat : str
    address : str
    category : str

class Estate(EstateBase):
    pass

    class Config:
        orm_mode = True

class EstateCreate(EstateBase):
    pass