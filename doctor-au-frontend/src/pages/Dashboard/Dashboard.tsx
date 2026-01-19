import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  FolderOpen,
  PlusCircle,
  Dog,
  MessageCircle,
  History,
  Shield,
  Users,
} from "lucide-react";
import "./Dashboard.css";

interface User {
  nome: string;
  email: string;
  perfil: "CLIENTE" | "MEDICO" | "ADMIN";
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Carregando dashboard...</p>;
  }

  return (
    <div className="dashboard-container">
      {/* Card do usuário */}
      <div className="user-card">
        <div className="user-left">
          <div className="avatar">
            {user.nome.charAt(0).toUpperCase()}
          </div>

          <div className="user-text">
            <span className="welcome">Bem-vindo(a)</span>
            <span className="user-name">{user.nome}</span>
          </div>
        </div>

        <span className={`user-role ${user.perfil.toLowerCase()}`}>
          {user.perfil}
        </span>
      </div>

      {/* Ações do Dashboard */}
      <div className="dashboard-actions">
        {/* CLIENTE */}
        {user.perfil === "CLIENTE" && (
          <>
            <Link to="/meus-pets" className="action-card">
              <div className="icon-dash">
                <Dog size={36} />
              </div>
              <h3>Meus Pets</h3>
              <p>Gerencie os perfis dos seus animais.</p>
            </Link>

            <Link to="/agendar" className="action-card">
              <div className="icon-dash">
                <CalendarDays size={36} />
              </div>
              <h3>Agendar Consulta</h3>
              <p>Marque nova consulta ou vacina.</p>
            </Link>

            <div className="action-card">
              <div className="icon-dash">
                <History size={36} />
              </div>
              <h3>Minhas Consultas</h3>
              <p>Histórico de consultas e exames.</p>
            </div>

            <div className="action-card">
              <div className="icon-dash">
                <MessageCircle size={36} />
              </div>
              <h3>Chat</h3>
              <p>Fale com a recepção.</p>
            </div>
          </>
        )}

        {/* MÉDICO */}
        {user.perfil === "MEDICO" && (
          <>
            <Link to="/feed" className="action-card">
              <div className="icon-dash">
                <FolderOpen size={36} />
              </div>
              <h3>Pacientes</h3>
              <p>Acessar prontuários.</p>
            </Link>

            <Link to="/consultas-medico" className="action-card">
              <div className="icon-dash">
                <CalendarDays size={36} />
              </div>
              <h3>Agenda</h3>
              <p>Consultas do mês.</p>
            </Link>

            <Link to="/novo-cadastro" className="action-card">
              <div className="icon-dash">
                <PlusCircle size={36} />
              </div>
              <h3>Novo Cadastro</h3>
              <p>Adicionar novo paciente.</p>
            </Link>

          </>
        )}

        {/* ADMIN */}
          {user.perfil === "ADMIN" && (
            <>
              <Link to="/admin/usuarios" className="action-card">
                <div className="icon-dash">
                  <Users size={36} />
                </div>
                <h3>Gerenciar Usuários</h3>
                <p>Clientes, médicos e administradores.</p>
              </Link>

              <Link to="/admin" className="action-card">
                <div className="icon-dash">
                  <Shield size={36} />
                </div>
                <h3>Painel Administrativo</h3>
                <p>Configurações do sistema.</p>
              </Link>
            </>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
