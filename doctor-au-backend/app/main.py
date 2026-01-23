from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin, ModelView 
from app.database import Base, engine
from app.models import User, Pet 
from app.routers import user, auth, pets, servicos, agendamentos

app = FastAPI(title="DoctorAu API")

# Cria as tabelas no banco se não existirem
Base.metadata.create_all(bind=engine)

# --- CONFIGURAÇÃO DO CORS ---
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROTAS DA API ---
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(pets.router)
app.include_router(servicos.router)
app.include_router(agendamentos.router)

# --- CONFIGURAÇÃO DO PAINEL ADMIN (SQLAdmin) ---
class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.nome, User.email, User.perfil]
    name = "Usuário"
    name_plural = "Usuários"
    icon = "fa-solid fa-user" # Ícone opcional

class PetAdmin(ModelView, model=Pet):
    column_list = [Pet.id, Pet.nome, Pet.especie, Pet.tutor, Pet.foto]
    name = "Pet"
    name_plural = "Pets"
    icon = "fa-solid fa-paw"

admin = Admin(app, engine)
admin.add_view(UserAdmin)
admin.add_view(PetAdmin)

@app.get("/")
def read_root():
    return {"status": "DoctorAu API rodando 🐶"}