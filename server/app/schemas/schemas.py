from pydantic import BaseModel, Field, EmailStr
from typing import Optional

# User
class User(BaseModel):
  email: EmailStr
  password: str = Field(min_length=8)

class UserLogin(BaseModel):
  email: EmailStr
  password: str

class UserUpdate(BaseModel):
  id: int
  email: EmailStr
  password: Optional[str] = Field(min_length=8)

# Form
class Form(BaseModel):
  name: str
  email: EmailStr
  description: str

# JWT
class Token(BaseModel):
  access_token: str
  token_type: str

class TokenData(BaseModel):
  email: str = None