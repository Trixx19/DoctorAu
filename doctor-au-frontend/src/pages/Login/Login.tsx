import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    let tipoUsuario = 'cliente'; 

    if (email.includes('admin')) {
      tipoUsuario = 'adm';
    } else if (email.includes('medico')) {
      tipoUsuario = 'medico';
    }

    localStorage.setItem('userRole', tipoUsuario);
    localStorage.setItem('userEmail', email);

    console.log(`Login efetuado como: ${tipoUsuario}`);
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>DoctorAu 🐶</h1>
        <p>Acesso ao Sistema</p>

        <form onSubmit={handleLogin}>
          {error && <div className="error-msg">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="ex: medico@doctorau.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
            />
          </div>

          <button type="submit" className="btn-entrar">
            Entrar
          </button>
        </form>
        
        {/* Dica visual para ajudar no teste (podes remover depois) */}
        <div style={{marginTop: '20px', fontSize: '0.8rem', color: '#666'}}>
          <p><strong>Para testar:</strong></p>
          <p>Admin: admin@doctorau.com</p>
          <p>Médico: medico@doctorau.com</p>
          <p>Cliente: cliente@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Login;