from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import schemas
from database import get_db
from models.user import User
from repositories.user_repository import UserRepository
from libs.crypto import hash_password, verify_password
from libs.security import create_access_token, get_current_user

router = APIRouter()

@router.post("/login", status_code=200)
def login(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = UserRepository.find_by_email(db, login_data.email)

    if not db_user or not verify_password(login_data.password, db_user.password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    return {
        "token": create_access_token(db_user.email),
    }

@router.post("/user", status_code=201)
def create_user(user: schemas.User, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    hashed_password = hash_password(user.password)

    db_user = User(
        email=user.email,
        password=hashed_password
    )

    try:
        saved_user = UserRepository.save(db, db_user)
    except:
        raise HTTPException(status_code=400, detail="Email already exists")

    return {
        "token": create_access_token(saved_user.email),
    }

@router.get("/user", status_code=200)
def get_all_users(db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    users = []

    for user in UserRepository.find_all(db):
        users.append({
            "id": user.id,
            "email": user.email
        })
        
    return users

@router.put("/user", status_code=200)
def update_user(user: schemas.UserUpdate, db: Session = Depends(get_db), _: str = Depends(get_current_user)):
    db_user = UserRepository.find_by_id(db, user.id)

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.email != db_user.email and UserRepository.does_email_exists(db, user.email):
        raise HTTPException(status_code=400, detail="Email already exists")
    

    UserRepository.save(db, User(
        **user.dict()
    ))

    return {
        "message": "User updated successfully"
    }