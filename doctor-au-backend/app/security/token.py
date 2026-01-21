from datetime import datetime, timedelta
from typing import Optional, Any
from jose import jwt
import os
from dotenv import load_dotenv

load_dotenv()

# Configurações Globais
SECRET_KEY = os.getenv("SECRET_KEY", "chavesecreta")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 30 
EMAIL_TOKEN_EXPIRE_HOURS = 24   

def criar_token_acesso(subject: Any) -> str:
    """
    Gera um JWT curto para manter o usuário logado (Access Token).
    """
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # 'sub' é padrão do JWT para identificar o dono do token (ID do usuário)
    # 'type' ajuda a diferenciar tokens de login de tokens de email
    to_encode = {"exp": expire, "sub": str(subject), "type": "access"}
    
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def gerar_token_email(user_id: int) -> str:
    """
    Gera um JWT longo específico para verificar email.
    """
    expire = datetime.utcnow() + timedelta(hours=EMAIL_TOKEN_EXPIRE_HOURS)
    
    to_encode = {"exp": expire, "sub": str(user_id), "type": "email_verification"}
    
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verificar_token(token: str) -> Optional[str]:
    """
    Decodifica e valida um token, retornando o ID do usuário (sub).
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except Exception:
        return None