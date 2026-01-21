from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import user as user_model
from app.schemas import user as user_schema
from app.security.password import hash_password
from app.security.token import gerar_token_email
import uuid

router = APIRouter(prefix="/users", tags=["Usuários"])

@router.post("/", response_model=user_schema.UserResponse)
async def criar_usuario(
    user: user_schema.UserCreate,
    db: Session = Depends(get_db)
):
    usuario_existente = db.query(user_model.User).filter(
        user_model.User.email == user.email
    ).first()

    if usuario_existente:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    token = gerar_token_email(novo_usuario.id)

    novo_usuario = user_model.User(
        nome=user.nome,
        email=user.email,
        senha=hash_password(user.senha),
        perfil=user.perfil,
        email_token=token
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    await enviar_email_verificacao(novo_usuario.email, token)

    return novo_usuario

@router.get("/verificar-email/{token}")
def verificar_email(token: str, db: Session = Depends(get_db)):
    usuario = db.query(user_model.User).filter(
        user_model.User.email_token == token
    ).first()

    if not usuario:
        raise HTTPException(status_code=400, detail="Token inválido")

    usuario.email_verificado = True
    usuario.email_token = None

    db.commit()

    return {"message": "Email verificado com sucesso 🎉"}
