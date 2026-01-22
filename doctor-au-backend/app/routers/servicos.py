from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.servico import Servico # <--- Corrigido
from app.schemas.servico import ServicoCreate, ServicoResponse
from app.dependencies import obter_usuario_logado
from app.models.user import User, PerfilEnum

router = APIRouter(prefix="/servicos", tags=["Serviços"])

# Listar todos os serviços (Público ou Logado)
@router.get("/", response_model=List[ServicoResponse])
def listar_servicos(db: Session = Depends(get_db)):
    return db.query(Servico).all()

# Criar Serviço (Apenas ADMIN ou MEDICO pode criar)
@router.post("/", response_model=ServicoResponse, status_code=201)
def criar_servico(
    servico: ServicoCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(obter_usuario_logado)
):
    # Verifica permissão
    if current_user.perfil not in [PerfilEnum.ADMIN, PerfilEnum.MEDICO]:
        raise HTTPException(status_code=403, detail="Apenas médicos ou admins podem criar serviços")

    novo_servico = Servico(**servico.dict())
    db.add(novo_servico)
    db.commit()
    db.refresh(novo_servico)
    return novo_servico

# Deletar Serviço
@router.delete("/{servico_id}", status_code=204)
def deletar_servico(
    servico_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(obter_usuario_logado)
):
    if current_user.perfil not in [PerfilEnum.ADMIN, PerfilEnum.MEDICO]:
        raise HTTPException(status_code=403, detail="Sem permissão")

    servico = db.query(Servico).filter(Servico.id == servico_id).first()
    if not servico:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")
    
    db.delete(servico)
    db.commit()