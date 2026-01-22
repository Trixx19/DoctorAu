from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import user as user_model
from app.schemas import user as user_schema
from app.security.password import hash_password
from app.security.token import gerar_token_email
from app.security.email import enviar_email_verificacao # <--- IMPORT NOVO
from app.dependencies import obter_usuario_logado
from app.models.user import PerfilEnum

router = APIRouter(prefix="/users", tags=["Usuários"])

# --- Listar Usuários (Apenas Admin) ---
@router.get("/", response_model=List[user_schema.UserResponse])
def listar_usuarios(
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(obter_usuario_logado)
):
    if current_user.perfil != PerfilEnum.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas administradores podem listar usuários"
        )
    return db.query(user_model.User).all()

# --- Criar Usuário (Com Envio de Email Real) ---
@router.post("/", response_model=user_schema.UserResponse, status_code=201)
async def criar_usuario( # <--- Mudou para ASYNC
    user: user_schema.UserCreate,
    db: Session = Depends(get_db)
):
    # 1. Verifica se email já existe
    usuario_existente = db.query(user_model.User).filter(
        user_model.User.email == user.email
    ).first()

    if usuario_existente:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    # 2. Cria o usuário SEM o token primeiro (nasce bloqueado)
    novo_usuario = user_model.User(
        nome=user.nome,
        email=user.email,
        senha=hash_password(user.senha),
        perfil=user.perfil,
        email_verificado=False 
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario) # Gera o ID

    # 3. Gera o token e atualiza o usuário
    token = gerar_token_email(novo_usuario.id)
    novo_usuario.email_token = token
    db.commit()

    # 4. ENVIA O EMAIL REAL
    try:
        await enviar_email_verificacao(novo_usuario.email, token)
    except Exception as e:
        print(f"❌ Erro ao enviar email: {e}")
        # Aqui decidimos não travar o cadastro, apenas logar o erro.
        # Se quiser ser rigoroso, poderia dar rollback e lançar erro.
    
    return novo_usuario

# --- Deletar Usuário ---
@router.delete("/{user_id}", status_code=204)
def deletar_usuario(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(obter_usuario_logado)
):
    # Regra: Só pode deletar se for o PRÓPRIO usuário ou se for ADMIN
    if current_user.id != user_id and current_user.perfil != PerfilEnum.ADMIN:
        raise HTTPException(status_code=403, detail="Permissão negada")
    
    usuario_para_deletar = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    
    if not usuario_para_deletar:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    db.delete(usuario_para_deletar)
    db.commit()

# --- Verificar Email (Link que o usuário clica) ---
@router.get("/verificar-email/{token}")
def verificar_email(token: str, db: Session = Depends(get_db)):
    user = db.query(user_model.User).filter(user_model.User.email_token == token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Token inválido ou expirado")
    
    user.email_verificado = True
    user.email_token = None
    db.commit()
    return {"msg": "Email verificado com sucesso! Agora você pode fazer login."}