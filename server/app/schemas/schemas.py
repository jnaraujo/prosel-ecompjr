from pydantic import BaseModel, Field
from typing import Optional

# User
class User(BaseModel):
  email: str
  password: str = Field(min_length=8)

class UserLogin(BaseModel):
  email: str
  password: str

class UserUpdate(BaseModel):
  id: int
  email: str
  password: Optional[str] = Field(min_length=8)

# Form
class Form(BaseModel):
  name: str
  email: str
  description: str

# JWT
class Token(BaseModel):
  access_token: str
  token_type: str

class TokenData(BaseModel):
  email: str = None