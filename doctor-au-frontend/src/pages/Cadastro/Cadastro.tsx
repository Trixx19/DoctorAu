import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { register } from '../../services/authService'; // <--- Importa a função nova
import './Cadastro.css';
import { AxiosError } from 'axios';

const Cadastro = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nome || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      setError('Insira um e-mail válido.');
      return;
    }

    if (password.length < 8) { 
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      await register({
        nome,
        email,
        senha: password,
        perfil: "CLIENTE"
      });

      alert(`Cadastro realizado com sucesso! \n\nUm e-mail de verificação foi enviado para ${email}. \nPor favor, confirme antes de logar.`);
      
      navigate('/login');

    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.detail || 'Erro ao realizar cadastro.');
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        
        {/* Link de Voltar */}
        <Link to="/login" className="back-link">
          <ArrowLeft size={20} />
          Voltar para Login
        </Link>

        <div className="header-cadastro">
          <h1>Crie sua conta</h1>
          <p>Junte-se ao DoctorAu e cuide melhor do seu pet.</p>
        </div>

        {/* Exibe erro se houver */}
        {error && <div className="error-message" style={{color: 'red', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}

        <form onSubmit={handleRegister}>
          
          <div className="form-group">
            <label>Nome Completo</label>
            <div className="input-icon">
              <UserIcon size={18} />
              <input 
                type="text" 
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => { setNome(e.target.value); setError(''); }}
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <div className="input-icon">
              <Lock size={18} />
              <input 
                type="password" 
                placeholder="Crie uma senha forte (min 8 chars, Letra Maiúscula, Especial)"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn-cadastrar" disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta Grátis"}
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