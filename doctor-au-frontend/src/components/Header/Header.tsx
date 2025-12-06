// src/components/Header/Header.tsx
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para saber em que página estamos

  // Sempre que mudamos de rota (location), verificamos se o usuário está logado
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    // Se "role" existir (não for null), isLogged vira true
    setIsLogged(!!role);
  }, [location]);

  const handleLogout = () => {
    // 1. Limpa os dados do navegador
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // 2. Atualiza o estado local
    setIsLogged(false);
    
    // 3. Redireciona para a Home
    navigate('/');
  };

  return (
    <header className="main-header">
      {/* O Logo clica e leva para a Home (ou Dashboard se logado) */}
      <Link to={isLogged ? "/dashboard" : "/"} className="logo-header" style={{textDecoration: 'none'}}>
        DoctorAu
      </Link>
      
      <nav className="nav-links">
        {/* Links comuns */}
        <Link to={isLogged ? "/dashboard" : "/"}>Início</Link>
        
        {/* Só mostra "Sobre" e "Consultas" na Home ou se quiseres sempre */}
        {!isLogged && <a href="#sobre">Sobre Nós</a>}
        
        {/* LÓGICA DO BOTÃO */}
        {isLogged ? (
          // SE ESTIVER LOGADO: Mostra Botão Sair
          <button onClick={handleLogout} className="logout-btn-header">
            Sair
          </button>
        ) : (
          // SE NÃO ESTIVER LOGADO: Mostra Botão Entrar
          <Link to="/login" className="login-link">
            Área do Cliente
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;