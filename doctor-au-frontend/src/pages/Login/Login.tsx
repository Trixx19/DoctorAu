import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateForm(): boolean {
    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      return false;
    }
    if (!email.includes("@")) {
      setError("E-mail inválido.");
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const usuario = await login(email, password);

      localStorage.setItem("usuario_logado", JSON.stringify(usuario));

        navigate("/dashboard");
      
      
    } catch (err) {
      console.error(err);
      setError("E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        {}
        {/* <img src="/src/assets/img/homedoctor.png" alt="Logo" className="login-logo" style={{maxWidth: '150px', margin: '0 auto 1rem', display: 'block'}} /> */}
        
        <h2>Bem-vindo de volta!</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        
        {}
        <div style={{marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem'}}>
           Ainda não tem conta? <a href="/cadastro" style={{color: 'var(--brand-green)', fontWeight: 'bold'}}>Cadastre-se</a>
        </div>
      </form>
    </div>
  );
};

export default Login;