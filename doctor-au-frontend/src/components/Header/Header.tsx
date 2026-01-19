// src/components/Header/Header.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

interface User {
  nome: string;
  perfil: "ADMIN" | "MEDICO" | "CLIENTE";
  foto?: string | null;
}

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <header className="main-header">
      {/* LOGO */}
      <Link to={user ? "/dashboard" : "/"} className="logo-header">
        DoctorAu
      </Link>

      <nav className="nav-links">
        <Link to={user ? "/dashboard" : "/"}>Início</Link>

        {!user && <a href="#sobre">Sobre Nós</a>}

        {/* USUÁRIO LOGADO */}
        {user && (
          <div className="user-header">
            {/* MENU POR PERFIL */}
            {user.perfil === "ADMIN" && <Link to="/admin">Admin</Link>}
            {user.perfil === "MEDICO" && (
              <Link to="/consultas-medico">Agenda</Link>
            )}
            {user.perfil === "CLIENTE" && (
              <Link to="/minhas-consultas">Minhas Consultas</Link>
            )}

            {/* AVATAR */}
            <Link to="/perfil" className="avatar-header">
              {user.foto ? (
                <img
                  src={user.foto}
                  alt="Avatar"
                  className="avatar-img"
                />
              ) : (
                user.nome.charAt(0).toUpperCase()
              )}
            </Link>


            <button onClick={handleLogout} className="logout-btn-header">
              Sair
            </button>
          </div>
        )}

        {/* USUÁRIO DESLOGADO */}
        {!user && (
          <Link to="/login" className="login-link">
            Área do Cliente
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
