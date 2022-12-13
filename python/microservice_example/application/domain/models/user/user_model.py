from pydantic import BaseModel, EmailStr

class User(BaseModel):
    username: str
    password: str
    email: EmailStr
    name: str
    last_name: str