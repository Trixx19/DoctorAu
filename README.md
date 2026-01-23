# 🐾 DoctorAu - Sistema de Gestão Veterinária

O **DoctorAu** é uma aplicação web completa para gestão de clínicas veterinárias e tutores de pets. O sistema permite o cadastro de usuários, gestão de pets (com fotos), agendamentos e possui um painel administrativo integrado.

## 🚀 Tecnologias Utilizadas

### Backend (API)
- **Python 3.12+**
- **FastAPI** (Framework web moderno e rápido)
- **SQLAlchemy** (ORM para banco de dados)
- **PostgreSQL** (Banco de Dados Relacional)
- **Pydantic** (Validação de dados)
- **JWT** (Autenticação segura)
- **SQLAdmin** (Painel administrativo automático)
- **FastAPI-Mail** (Envio de emails de confirmação)

### Frontend (Interface)
- **React + TypeScript** (Vite)
- **CSS Modules** (Estilização moderna)
- **Axios** (Consumo da API)
- **Lucide React** (Ícones)
- **Cloudinary** (Upload e armazenamento de imagens na nuvem)

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
- [Python](https://www.python.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (e pgAdmin opcionalmente)
- [Git](https://git-scm.com/)

---

## 🔧 Configuração e Instalação

### 1. Backend (Servidor)

1. Clone o repositório e entre na pasta do backend:
   ```bash
   cd doctor-au-backend
Crie e ative um ambiente virtual (.venv):

Bash

# Windows
python -m venv .venv
.\.venv\Scripts\activate

# Linux/Mac
python3 -m venv .venv
source .venv/bin/activate
Instale as dependências:

Bash

pip install -r requirements.txt
Configure as variáveis de ambiente: Crie um arquivo .env na raiz do backend e preencha com seus dados:

Snippet de código

DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/doctorau
SECRET_KEY=sua_chave_super_secreta
ALGORITHM=HS256

# Configuração de Email
MAIL_USERNAME=seu_email@gmail.com
MAIL_PASSWORD=sua_senha_de_app
MAIL_FROM=seu_email@gmail.com
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
Execute o servidor:

Bash

uvicorn app.main:app --reload
O backend rodará em: http://localhost:8000 Documentação interativa (Swagger): http://localhost:8000/docs Painel Administrativo: http://localhost:8000/admin



2. Frontend (Cliente Web)
Em outro terminal, entre na pasta do frontend:

Bash

cd doctor-au-frontend
Instale as dependências do Node:

Bash

npm install
Configure o Cloudinary: Certifique-se de que os arquivos NovoCadastro.tsx e Perfil.tsx contenham suas credenciais (cloud_name e upload_preset).

Execute o projeto:

Bash

npm run dev
O frontend rodará em: http://localhost:5173

📸 Funcionalidades Principais
Autenticação: Login seguro e cadastro com verificação de e-mail.

Meus Pets: CRUD completo de pets (Criar, Ler, Atualizar, Deletar).

Upload de Fotos: Integração com Cloudinary para fotos de perfil e dos pets.

Painel Admin: Interface administrativa para gestão total do banco de dados.