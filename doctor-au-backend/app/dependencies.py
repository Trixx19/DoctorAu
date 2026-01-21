from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
# Aqui está a mágica: importamos a função pronta, em vez de fazer na mão
from app.security.token import verificar_token 

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def obter_usuario_logado(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # 1. Usa a função centralizada para validar
    user_id = verificar_token(token)
    
    # 2. Se a função retornou None, o token é inválido
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # 3. Busca o usuário no banco
    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    
    return user