from pydantic import BaseModel, EmailStr, field_validator
from enum import Enum
import re

class PerfilEnum(str, Enum):
    ADMIN = "ADMIN"
    MEDICO = "MEDICO"
    CLIENTE = "CLIENTE"

class UserCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    perfil: PerfilEnum

    @field_validator('senha')
    @classmethod
    def validar_seguranca_senha(cls, v):
        # 1. Mínimo de 8 caracteres
        if len(v) < 8:
            raise ValueError('A senha deve ter pelo menos 8 caracteres')
        
        # 2. Pelo menos uma letra maiúscula
        if not re.search(r'[A-Z]', v):
            raise ValueError('A senha deve conter pelo menos uma letra maiúscula')
        
        # 3. Pelo menos uma letra minúscula
        if not re.search(r'[a-z]', v):
            raise ValueError('A senha deve conter pelo menos uma letra minúscula')
        
        # 4. Pelo menos um número
        if not re.search(r'[0-9]', v):
            raise ValueError('A senha deve conter pelo menos um número')
        
        # 5. Pelo menos um caractere especial
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('A senha deve conter pelo menos um caractere especial (!@#$...)')
            
        return v


class UserResponse(BaseModel):
    id: int
    nome: str
    email: EmailStr
    perfil: PerfilEnum
    email_verificado: bool

    model_config = {
        "from_attributes": True
    }