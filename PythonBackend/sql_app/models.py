from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Estate(Base):
    __tablename__ = 'housedata'

    id = Column(String, primary_key=True)
    estatename = Column(String)
    lug = Column(String)
    lat = Column(String)
    prvin = Column(String)
    city = Column(String)
    munici = Column(String)
    community = Column(String)
    date = Column(String)
    price = Column(String)
    avgprice = Column(String)
    listedprice = Column(String)
    arch = Column(String)
    floor = Column(String)
    farea = Column(String)
    duplex = Column(String)
    towards = Column(String)
    fitment = Column(String)
    ages = Column(String)
    rate = Column(String)
    rightage = Column(String)
    elevator = Column(String)
    ownership = Column(String)
    span = Column(String)
    chtime = Column(String)
    visitor = Column(String)
    star = Column(String)
    look = Column(String)