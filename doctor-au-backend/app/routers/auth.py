from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.security.token import criar_token_acesso
from app.security.password import verify_password

router = APIRouter(tags=["Autenticação"])

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Busca usuário pelo email (username no form do Swagger)
    user = db.query(User).filter(User.email == form_data.username).first()
    
    # Verifica se usuário existe e se a senha bate
    if not user or not verify_password(form_data.password, user.senha):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Gera o token usando sua função
    access_token = criar_token_acesso(subject=user.id)
    
    return {"access_token": access_token, "token_type": "bearer"}