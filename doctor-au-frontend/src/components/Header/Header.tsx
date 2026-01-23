import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../services/authService"; 
import "./Header.css";

interface User {
  id: number;
  nome: string;
  email: string;
  perfil: "ADMIN" | "MEDICO" | "CLIENTE";
  foto?: string;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario_logado");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    logout(); // Limpa token
    localStorage.removeItem("usuario_logado"); 
    setUser(null);
    navigate("/login");
  };

  const inicial = user?.nome ? user.nome.charAt(0).toUpperCase() : "?";

  return (
    <header className="main-header">
      {}
      <Link to={user ? "/dashboard" : "/"} className="logo-header">
        DoctorAu
      </Link>

      <nav className="nav-links">
        <Link to={user ? "/dashboard" : "/"}>Início</Link>

        {}
        {!user && <Link to="/login" className="login-link">Entrar</Link>}

        {}
        {user && (
          <div className="user-header">
            
            {}
            {user.perfil === "ADMIN" && (
              <Link to="/admin">Painel Admin</Link>
            )}
            
            {user.perfil === "MEDICO" && (
              <Link to="/consultas-medico">Minha Agenda</Link>
            )}
            
            {user.perfil === "CLIENTE" && (
              <>
                <Link to="/meus-pets">Meus Pets</Link>
                <Link to="/minhas-consultas">Minhas Consultas</Link>
              </>
            )}

            {}
            <Link to="/perfil" className="avatar-header" title="Meu Perfil">
              {user.foto ? (
                <img src={user.foto} alt="Avatar" className="avatar-img" />
              ) : (
                inicial
              )}
            </Link>

            <button onClick={handleLogout} className="logout-btn-header">
              Sair
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;