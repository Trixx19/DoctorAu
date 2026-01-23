import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  FolderOpen,
  PlusCircle,
  Dog,
  History,
  Shield,
  Users,
} from "lucide-react";
import "./Dashboard.css";

interface User {
  id: number;
  nome: string;
  email: string;
  perfil: "ADMIN" | "MEDICO" | "CLIENTE";
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario_logado");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao ler dados do usuário", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="dashboard-container">
        <p style={{textAlign: "center", color: "#666"}}>Carregando suas informações...</p>
      </div>
    );
  }

  return (
    <>

      
      <div className="dashboard-container">
        
        {/* CARD DO USUÁRIO */}
        <div className="user-card">
          <div className="user-left">
            <div className="avatar">
              {}
              {user.nome.charAt(0).toUpperCase()}
            </div>

            <div className="user-text">
              <span className="welcome">Bem-vindo(a),</span>
              <span className="user-name">{user.nome}</span>
            </div>
          </div>

          {}
          <span className={`user-role ${user.perfil.toLowerCase()}`}>
            {user.perfil === "ADMIN" && "Administrador"}
            {user.perfil === "MEDICO" && "Veterinário"}
            {user.perfil === "CLIENTE" && "Tutor"}
          </span>
        </div>

        {}
        <div className="dashboard-actions">

          {/* === PERFIL CLIENTE === */}
          {user.perfil === "CLIENTE" && (
            <>
              <Link to="/meus-pets" className="action-card">
                <div className="icon-dash">
                  <Dog size={36} />
                </div>
                <h3>Meus Pets</h3>
                <p>Ver carteira de vacinação.</p>
              </Link>

              <Link to="/agendar" className="action-card">
                <div className="icon-dash">
                  <PlusCircle size={36} />
                </div>
                <h3>Agendar Consulta</h3>
                <p>Marque um horário pro seu pet.</p>
              </Link>

              <Link to="/minhas-consultas" className="action-card">
                <div className="icon-dash">
                  <History size={36} />
                </div>
                <h3>Histórico</h3>
                <p>Veja suas consultas passadas.</p>
              </Link>
            </>
          )}

          {/* === PERFIL MÉDICO  === */}
          {user.perfil === "MEDICO" && (
            <>
              <Link to="/pacientes" className="action-card">
                <div className="icon-dash">
                  <FolderOpen size={36} />
                </div>
                <h3>Pacientes</h3>
                <p>Acessar prontuários e fichas.</p>
              </Link>

              <Link to="/consultas-medico" className="action-card">
                <div className="icon-dash">
                  <CalendarDays size={36} />
                </div>
                <h3>Minha Agenda</h3>
                <p>Próximas consultas marcadas.</p>
              </Link>
            </>
          )}

          {/* === PERFIL ADMIN === */}
          {user.perfil === "ADMIN" && (
            <>
              <Link to="/admin/usuarios" className="action-card">
                <div className="icon-dash">
                  <Users size={36} />
                </div>
                <h3>Gerenciar Usuários</h3>
                <p>Controle de acesso total.</p>
              </Link>

              <Link to="/admin" className="action-card">
                <div className="icon-dash">
                  <Shield size={36} />
                </div>
                <h3>Painel Admin</h3>
                <p>Métricas e configurações.</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;