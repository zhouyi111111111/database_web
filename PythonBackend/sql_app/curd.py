from sqlalchemy.orm import Session

from . import models, schemas

def get_estate(db: Session, estate_id: str):
    return db.query(models.Estate).filter(models.Estate.id == estate_id).first()

def get_estates(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Estate).offset(skip).limit(limit).all()

def create_estate(db: Session, estate: schemas.EstateCreate):
    db_estate = models.Estate(**estate.dict())
    db.add(db_estate)
    db.commit()
    db.refresh(db_estate)
    return db_estate

def delete_estate(db: Session, estate_id: str):
    db_estate = db.query(models.Estate).filter(models.Estate.id == estate_id).first()
    if db_estate:
        db.delete(db_estate)
        db.commit()
    return db_estate
