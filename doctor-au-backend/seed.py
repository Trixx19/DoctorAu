from app.database import SessionLocal, engine, Base
from app.models.user import User, PerfilEnum
from app.models.pet import Pet
from app.models.servico import Servico
from app.models.agendamento import Agendamento, StatusAgendamento
from app.security.password import hash_password
from datetime import datetime, timedelta
import sys

# Importante: Carrega os models para o SQLAlchemy reconhecê-los
import app.models 

# --- A CORREÇÃO ESTÁ AQUI ---
# Apaga todas as tabelas existentes para evitar conflitos de colunas antigas
print("🔥 Resetando o banco de dados (Drop All)...")
Base.metadata.drop_all(bind=engine)
# ----------------------------

# Recria as tabelas do zero com a estrutura correta
print("🏗️ Recriando tabelas...")
Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed():
    print("🌱 Iniciando o Seed...")

    # 2. Criar Usuários
    print("👤 Criando Usuários...")
    
    # Admin
    admin = User(
        nome="Admin Sistema",
        email="admin@doctorau.com",
        senha=hash_password("admin123"),
        perfil=PerfilEnum.ADMIN,
        email_verificado=True
    )
    
    # Veterinário
    vet = User(
        nome="Dr. Dolittle",
        email="vet@doctorau.com",
        senha=hash_password("vet123"),
        perfil=PerfilEnum.MEDICO,
        email_verificado=True
    )
    
    # Cliente
    cliente = User(
        nome="Maria Silva",
        email="maria@gmail.com",
        senha=hash_password("maria123"),
        perfil=PerfilEnum.CLIENTE,
        email_verificado=True
    )

    db.add_all([admin, vet, cliente])
    db.commit()
    
    # Precisamos dos IDs gerados, então fazemos refresh
    db.refresh(vet)
    db.refresh(cliente)

    # 3. Criar Serviços
    print("💉 Criando Serviços...")
    servicos = [
        Servico(nome="Consulta Clínica", descricao="Avaliação geral do pet", preco=150.00),
        Servico(nome="Vacina V10", descricao="Imunização anual", preco=80.00),
        Servico(nome="Banho e Tosa", descricao="Completo com hidratação", preco=60.00),
        Servico(nome="Exame de Sangue", descricao="Hemograma completo", preco=120.00)
    ]
    db.add_all(servicos)
    db.commit()
    
    # Recupera o serviço de consulta para usar no agendamento
    consulta = servicos[0] 

    # 4. Criar Pets (do Cliente)
    print("🐶 Criando Pets...")
    pet1 = Pet(
        nome="Rex",
        especie="Cachorro",
        raca="Golden Retriever",
        idade=5,
        peso=32.5,
        dono_id=cliente.id
    )
    
    pet2 = Pet(
        nome="Mimi",
        especie="Gato",
        raca="Siamês",
        idade=2,
        peso=4.0,
        dono_id=cliente.id
    )
    
    db.add_all([pet1, pet2])
    db.commit()
    db.refresh(pet1)

    # 5. Criar Agendamentos
    print("📅 Criando Agendamentos...")
    agendamento = Agendamento(
        data_hora=datetime.now() + timedelta(days=1, hours=2), # Amanhã
        status=StatusAgendamento.PENDENTE,
        observacoes="Pet está mancando um pouco.",
        pet_id=pet1.id,
        veterinario_id=vet.id, # Vincula ao veterinário criado
        servico_id=consulta.id
    )
    
    db.add(agendamento)
    db.commit()

    print("✅ Seed concluído com sucesso!")
    print(f"   Admin: admin@doctorau.com / admin123")
    print(f"   Vet:   vet@doctorau.com / vet123")
    print(f"   User:  maria@gmail.com / maria123")

if __name__ == "__main__":
    try:
        seed()
    except Exception as e:
        print(f"❌ Erro ao rodar seed: {e}")
        db.rollback()
    finally:
        db.close()