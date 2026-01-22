from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text, Enum
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class StatusAgendamento(str, enum.Enum):
    PENDENTE = "PENDENTE"
    CONFIRMADO = "CONFIRMADO"
    CONCLUIDO = "CONCLUIDO"
    CANCELADO = "CANCELADO"

class Agendamento(Base):
    __tablename__ = "agendamentos"

    id = Column(Integer, primary_key=True, index=True)
    data_hora = Column(DateTime, nullable=False)
    status = Column(Enum(StatusAgendamento), default=StatusAgendamento.PENDENTE)
    observacoes = Column(Text)

    # Chaves Estrangeiras
    pet_id = Column(Integer, ForeignKey("pets.id"), nullable=False)
    veterinario_id = Column(Integer, ForeignKey("users.id"))
    servico_id = Column(Integer, ForeignKey("servicos.id"))

    # Relacionamentos
    pet = relationship("Pet", back_populates="agendamentos")
    veterinario = relationship("User", back_populates="agendamentos_vet")
    servico = relationship("Servico", back_populates="agendamentos")
    
    prontuario = relationship("Prontuario", back_populates="agendamento", uselist=False)