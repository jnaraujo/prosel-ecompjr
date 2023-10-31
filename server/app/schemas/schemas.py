from pydantic import BaseModel

# User
class User(BaseModel):
  email: str
  password: str

class UserLogin(BaseModel):
  email: str
  password: str

class UserUpdate(BaseModel):
  id: int
  email: str
  password: str | None

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