from pydantic import BaseModel, EmailStr
from enum import Enum

class PerfilEnum(str, Enum):
    ADMIN = "ADMIN"
    MEDICO = "MEDICO"
    CLIENTE = "CLIENTE"

class UserCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    perfil: PerfilEnum

class UserResponse(BaseModel):
    id: int
    nome: str
    email: EmailStr
    perfil: PerfilEnum
    email_verificado: bool

    model_config = {
        "from_attributes": True
    }
