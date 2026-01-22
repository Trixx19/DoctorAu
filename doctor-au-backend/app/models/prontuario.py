from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Prontuario(Base):
    __tablename__ = "prontuarios"

    id = Column(Integer, primary_key=True, index=True)
    diagnostico = Column(Text, nullable=False)
    prescricao = Column(Text)
    data_registro = Column(DateTime, default=datetime.utcnow)
    
    # Relacionamentos
    agendamento_id = Column(Integer, ForeignKey("agendamentos.id"), unique=True)
    agendamento = relationship("Agendamento", back_populates="prontuario")