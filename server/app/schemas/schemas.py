from pydantic import BaseModel

# User
class User(BaseModel):
  email: str
  name: str
  password: str

class UserLogin(BaseModel):
  email: str
  password: str

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