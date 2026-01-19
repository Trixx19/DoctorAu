import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return false;
    }

    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    // Simulação de login (mock)
    setTimeout(() => {
      const perfil =
      email.includes("admin")
        ? "ADMIN"
        : email.includes("medico")
        ? "MEDICO"
        : "CLIENTE";

    const userMock = {
      nome:
        perfil === "ADMIN"
          ? "Administrador"
          : perfil === "MEDICO"
          ? "Dr(a). Usuário"
          : "Usuário",
      email,
      perfil,
    };


      // 🔑 ESSENCIAL PARA PRIVATE ROUTE
      localStorage.setItem("token", "fake-jwt-token");
      localStorage.setItem("user", JSON.stringify(userMock));

      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="register-link">
          Não tem conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
