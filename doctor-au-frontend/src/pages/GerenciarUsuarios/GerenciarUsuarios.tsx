import { useEffect, useState } from "react";
import api from "../../services/api"; 
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
      const response = await api.get<Usuario[]>("/users/");
      setUsuarios(response.data);
    } catch (err) {
      console.error(err);
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
      await api.delete(`/users/${id}`);
      
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      alert("Usuário removido com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir usuário. Verifique se você tem permissão.");
    }
  }

  if (loading) {
    return <p style={{ padding: "2rem", textAlign: "center" }}>Carregando usuários...</p>;
  }

  if (error) {
    return <p style={{ padding: "2rem", color: "red", textAlign: "center" }}>{error}</p>;
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
        <div className="table-responsive">
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
                    {}
                    <button className="editar" onClick={() => alert(`Editar usuário: ${user.nome}`)}>
                      Editar
                    </button>
                    
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
        </div>
      )}
    </div>
  );
};

export default GerenciarUsuarios;