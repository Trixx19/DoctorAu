import { useEffect, useState } from "react";
import { Loader2, Save, UploadCloud } from "lucide-react"; // Ícones para ficar bonito
import api from "../../services/api"; 
import "./Perfil.css";

interface User {
  id: number;
  nome: string;
  email: string;
  perfil: "CLIENTE" | "MEDICO" | "ADMIN";
  foto?: string; 
}

const Perfil = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Novos estados para o Upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // 1. Busca os dados do usuário logado
  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get<User>("/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  // 2. Seleciona a foto e gera preview local
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setSelectedFile(file); // Guarda o arquivo para upload
    setMessage(""); // Limpa mensagens antigas

    const reader = new FileReader();
    reader.onloadend = () => {
      // Atualiza apenas visualmente para o usuário ver como vai ficar
      setUser({ ...user, foto: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = async () => {
    if (!selectedFile || !user) return;
    setSaving(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      formData.append("upload_preset", "SDoctorAu"); 
      formData.append("cloud_name", "dfdgeaitr"); 

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/dfdgeaitr/image/upload`, 
        { method: "POST", body: formData }
      );
      
      if (!cloudRes.ok) throw new Error("Erro no upload da imagem");
      
      const cloudData = await cloudRes.json();
      const newPhotoUrl = cloudData.secure_url;

      await api.put("/users/me", { foto: newPhotoUrl });

      setMessage("Foto de perfil atualizada com sucesso! ✨");
      setSelectedFile(null);
      
    } catch (error) {
      console.error("Erro ao salvar:", error);
      setMessage("Erro ao salvar a foto. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="perfil-container"><p>Carregando...</p></div>;
  }

  if (!user) {
    return <div className="perfil-container"><p className="error">Erro ao carregar perfil.</p></div>;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        {/* AVATAR */}
        <div className="perfil-avatar-wrapper">
          <label htmlFor="avatar-upload" className="perfil-avatar">
            {user.foto ? (
              <img src={user.foto} alt="Avatar" />
            ) : (
              <div className="avatar-placeholder">
                {user.nome.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="avatar-overlay">
              <UploadCloud size={24} color="white" />
            </div>
          </label>

          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />
        </div>

        {}
        {selectedFile && (
          <div className="save-action">
            <button 
              onClick={handleSavePhoto} 
              disabled={saving}
              className="btn-salvar-perfil"
            >
              {saving ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
              {saving ? "Salvando..." : "Salvar Nova Foto"}
            </button>
          </div>
        )}

        {/* Mensagem de Feedback */}
        {message && <p className="msg-feedback">{message}</p>}

        <h2>{user.nome}</h2>
        <p className="perfil-email">{user.email}</p>

        <span className={`perfil-badge ${user.perfil.toLowerCase()}`}>
          {user.perfil}
        </span>

        <div className="perfil-info">
          <div>
            <strong>Tipo</strong>
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