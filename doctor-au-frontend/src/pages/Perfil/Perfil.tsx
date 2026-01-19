import { useEffect, useState } from "react";
import "./Perfil.css";

interface User {
  nome: string;
  email: string;
  perfil: "CLIENTE" | "MEDICO" | "ADMIN";
  avatar?: string;
}

const Perfil = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = {
        ...user,
        avatar: reader.result as string,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    reader.readAsDataURL(file);
  };

  if (!user) {
    return <p style={{ padding: "2rem" }}>Carregando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        {/* AVATAR */}
        <div className="perfil-avatar-wrapper">
          <label htmlFor="avatar-upload" className="perfil-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar do usuário" />
            ) : (
              user.nome.charAt(0).toUpperCase()
            )}
          </label>

          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />

          <span className="avatar-hint">Clique para alterar foto</span>
        </div>

        <h2>{user.nome}</h2>
        <p className="perfil-email">{user.email}</p>

        <span className={`perfil-badge ${user.perfil.toLowerCase()}`}>
          {user.perfil}
        </span>

        <div className="perfil-info">
          <div>
            <strong>Tipo de usuário</strong>
            <span>{user.perfil}</span>
          </div>

          <div>
            <strong>Status</strong>
            <span className="status-ativo">Ativo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
