import { useEffect, useState } from "react";
import "./GerenciarUsuarios.css";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil: "ADMIN" | "MEDICO" | "CLIENTE";
}

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      setError("Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  }

  async function removerUsuario(id: number) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );
    if (!confirmacao) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
      }

      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Erro ao excluir usuário.");
    }
  }

  if (loading) {
    return <p style={{ padding: "2rem" }}>Carregando usuários...</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  }

  return (
    <div className="usuarios-container">
      <h1>Gerenciar Usuários</h1>

      {usuarios.length === 0 ? (
        <div className="empty-state">
            <div className="empty-icon">👤</div>
            <h2>Nenhum usuário cadastrado</h2>
            <p>
                Ainda não existem usuários registrados no sistema.
                Quando isso acontecer, eles aparecerão aqui.
            </p>
        </div>
      ) : (
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.perfil.toLowerCase()}`}>
                    {user.perfil}
                  </span>
                </td>
                <td className="acoes">
                  <button className="editar">Editar</button>
                  <button
                    className="excluir"
                    onClick={() => removerUsuario(user.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GerenciarUsuarios;
