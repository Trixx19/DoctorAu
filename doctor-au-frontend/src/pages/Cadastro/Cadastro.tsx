import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import './Cadastro.css';

const Cadastro = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      setError('Insira um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${nome}.`);
    
    navigate('/login');
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
 
        <Link to="/login" className="back-link">
          <ArrowLeft size={20} /> Voltar
        </Link>

        <div className="header-cadastro">
          <h1>Crie sua conta</h1>
          <p>Junte-se à família DoctorAu 🐶</p>
        </div>

        <form onSubmit={handleRegister}>
          {error && <div className="error-msg">{error}</div>}

          <div className="form-group">
            <label>Nome Completo</label>
            <div className="input-icon">
              <User size={18} />
              <input 
                type="text" 
                placeholder="Ex: Maria Silva"
                value={nome}
                onChange={(e) => { setNome(e.target.value); setError(''); }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <div className="input-icon">
              <Mail size={18} />
              <input 
                type="email" 
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-icon">
              <Lock size={18} />
              <input 
                type="password" 
                placeholder="Crie uma senha forte"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <div className="input-icon">
              <CheckCircle size={18} />
              <input 
                type="password" 
                placeholder="Repita a senha"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
              />
            </div>
          </div>

          <button type="submit" className="btn-cadastrar">
            Criar Conta Grátis
          </button>
        </form>

        <div className="footer-cadastro">
          <p>Já tem uma conta? <Link to="/login">Fazer Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;