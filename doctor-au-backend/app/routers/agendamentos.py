from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.agendamento import Agendamento, StatusAgendamento
from app.models.pet import Pet
from app.models.servico import Servico
from app.models.user import User, PerfilEnum

from app.schemas.agendamento import AgendamentoCreate, AgendamentoResponse
from app.dependencies import obter_usuario_logado

router = APIRouter(prefix="/agendamentos", tags=["Agendamentos"])

@router.post("/", response_model=AgendamentoResponse, status_code=201)
def criar_agendamento(
    agendamento: AgendamentoCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(obter_usuario_logado)
):
    
    pet = db.query(Pet).filter(Pet.id == agendamento.pet_id).first()
    if not pet:
        raise HTTPException(status_code=404, detail="Pet não encontrado")
    
    # Se não for Admin/Vet, só pode agendar pro seu próprio pet
    if current_user.perfil not in [PerfilEnum.ADMIN, PerfilEnum.MEDICO]:
        if pet.dono_id != current_user.id:
            raise HTTPException(status_code=403, detail="Este pet não pertence a você")

    servico = db.query(Servico).filter(Servico.id == agendamento.servico_id).first()
    if not servico:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")

    novo_agendamento = Agendamento(
        data_hora=agendamento.data_hora,
        observacoes=agendamento.observacoes,
        status=StatusAgendamento.PENDENTE,
        pet_id=agendamento.pet_id,
        servico_id=agendamento.servico_id,
        veterinario_id=agendamento.veterinario_id
    )
    
    db.add(novo_agendamento)
    db.commit()
    db.refresh(novo_agendamento)
    return novo_agendamento

@router.get("/", response_model=List[AgendamentoResponse])
def listar_agendamentos(
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_logado)
):
    if current_user.perfil in [PerfilEnum.ADMIN, PerfilEnum.MEDICO]:
        return db.query(Agendamento).all()
    
    return db.query(Agendamento).join(Pet).filter(Pet.dono_id == current_user.id).all()

# ---  Cancelar Agendamento ---
@router.patch("/{agendamento_id}/cancelar", response_model=AgendamentoResponse)
def cancelar_agendamento(
    agendamento_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(obter_usuario_logado)
):
    agendamento = db.query(Agendamento).filter(Agendamento.id == agendamento_id).first()
    
    if not agendamento:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")

    if current_user.perfil not in [PerfilEnum.ADMIN, PerfilEnum.MEDICO]:
        if agendamento.pet.dono_id != current_user.id:
            raise HTTPException(status_code=403, detail="Permissão negada")

    agendamento.status = StatusAgendamento.CANCELADO
    db.commit()
    db.refresh(agendamento)
    return agendamento