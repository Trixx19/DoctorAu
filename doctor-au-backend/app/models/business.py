from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text, Enum
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime
import enum

class StatusAgendamento(str, enum.Enum):
    PENDENTE = "PENDENTE"
    CONFIRMADO = "CONFIRMADO"
    CONCLUIDO = "CONCLUIDO"
    CANCELADO = "CANCELADO"

class Pet(Base):
    __tablename__ = "pets"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    especie = Column(String, nullable=False)
    raca = Column(String)
    idade = Column(Integer)
    peso = Column(Float)
    
    dono_id = Column(Integer, ForeignKey("users.id"))
    dono = relationship("User", back_populates="pets")
    agendamentos = relationship("Agendamento", back_populates="pet")

class Servico(Base):
    __tablename__ = "servicos"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    descricao = Column(String)
    preco = Column(Float, nullable=False)
    agendamentos = relationship("Agendamento", back_populates="servico")

class Agendamento(Base):
    __tablename__ = "agendamentos"
    id = Column(Integer, primary_key=True, index=True)
    data_hora = Column(DateTime, nullable=False)
    status = Column(Enum(StatusAgendamento), default=StatusAgendamento.PENDENTE)
    observacoes = Column(Text)

    pet_id = Column(Integer, ForeignKey("pets.id"))
    pet = relationship("Pet", back_populates="agendamentos")

    veterinario_id = Column(Integer, ForeignKey("users.id"))
    veterinario = relationship("User", back_populates="agendamentos_vet")

    servico_id = Column(Integer, ForeignKey("servicos.id"))
    servico = relationship("Servico", back_populates="agendamentos")
    
    prontuario = relationship("Prontuario", back_populates="agendamento", uselist=False)

class Prontuario(Base):
    __tablename__ = "prontuarios"
    id = Column(Integer, primary_key=True, index=True)
    diagnostico = Column(Text, nullable=False)
    prescricao = Column(Text)
    data_registro = Column(DateTime, default=datetime.utcnow)
    
    agendamento_id = Column(Integer, ForeignKey("agendamentos.id"), unique=True)
    agendamento = relationship("Agendamento", back_populates="prontuario")