from sqlalchemy.orm import Session
from models.user import User

class UserRepository:

  @staticmethod
  def save(db:Session, user:User):
    if user.id:
      db.merge(user)
    else:
      db.add(user)

    db.commit()
    return user
  
  @staticmethod
  def find_by_email(db:Session, email:str):
    return db.query(User).filter(User.email == email).first()
  
  @staticmethod
  def find_all(db:Session):
    return db.query(User).all()
  
  @staticmethod
  def find_by_id(db:Session, id:int):
    return db.query(User).filter(User.id == id).first()
  
  @staticmethod
  def does_email_exists(db:Session, email:str):
    return db.query(User).filter(User.email == email).first() != None