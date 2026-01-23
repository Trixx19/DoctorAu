import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Dog, 
  Cat, 
  Calendar, 
  User, 
  PawPrint, 
  CheckCircle2, 
  AlertCircle, 
  Image as ImageIcon, 
  Loader2 
} from "lucide-react";
import api from "../../services/api";
import "./NovoCadastro.css";

const NovoCadastro = () => {
  const navigate = useNavigate();

  // Estados do Formulário
  const [nomePet, setNomePet] = useState("");
  const [especie, setEspecie] = useState("");
  const [idade, setIdade] = useState("");
  const [tutor, setTutor] = useState("");
  
  // Estados da Foto
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Estados de Feedback
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | "">("");
  const [loading, setLoading] = useState(false);

  // Função para pré-visualizar a imagem selecionada
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensagem("");
    setTipoMensagem("");

    if (!nomePet || !especie || !idade || !tutor) {
      setMensagem("Por favor, preencha todos os campos obrigatórios.");
      setTipoMensagem("erro");
      return;
    }

    setLoading(true);

    try {
      let fotoUrl = "";

      if (foto) {
        const formData = new FormData();
        formData.append("file", foto);
        
        formData.append("upload_preset", "DoctorAu"); 
        formData.append("cloud_name", "dfdgeaitr"); 

        try {
          const responseCloud = await fetch(
            `https://api.cloudinary.com/v1_1/dfdgeaitr/image/upload`, 
            {
              method: "POST",
              body: formData,
            }
          );

          if (!responseCloud.ok) throw new Error("Falha no upload da imagem");

          const dataCloud = await responseCloud.json();
          fotoUrl = dataCloud.secure_url;
        } catch (uploadError) {
          console.error("Erro no Cloudinary:", uploadError);
          setMensagem("Erro ao enviar a imagem. Tente novamente.");
          setTipoMensagem("erro");
          setLoading(false);
          return;
        }
      }

      const payload = {
        nome: nomePet,
        especie: especie,
        idade: parseInt(idade),
        tutor: tutor,
        foto: fotoUrl 
      };

      await api.post("/pets/", payload);

      setMensagem("Paciente cadastrado com sucesso! 🐾");
      setTipoMensagem("sucesso");
      
      setNomePet("");
      setEspecie("");
      setIdade("");
      setTutor("");
      setFoto(null);
      setPreview(null);

      setTimeout(() => {
        navigate("/meus-pets");
      }, 1500);

    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
      setMensagem("Erro ao salvar no sistema. Verifique os dados.");
      setTipoMensagem("erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="novo-cadastro-container">
      <div className="novo-cadastro-card">
        
        {/* Botão Voltar */}
        <Link to="/meus-pets" className="btn-voltar-topo">
          <ArrowLeft size={20} />
          Voltar para Lista
        </Link>

        <div className="header-form">
          <h1>Novo Paciente</h1>
          <p>Preencha os dados e adicione uma foto do pet.</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Área de Upload de Foto */}
          <div className="upload-container">
            <label htmlFor="foto-upload" className="upload-box">
              {preview ? (
                <img src={preview} alt="Preview" className="img-preview" />
              ) : (
                <div className="upload-placeholder">
                  <ImageIcon size={32} color="#10b981" />
                  <span>Foto</span>
                </div>
              )}
            </label>
            <input 
              type="file" 
              id="foto-upload" 
              accept="image/*" 
              onChange={handleFileChange}
              hidden 
            />
          </div>

          {/* Campos do Formulário */}
          <div className="form-group-moderno">
            <label>Nome do Pet</label>
            <div className="input-wrapper">
              <Dog size={20} className="input-icon-left" />
              <input
                type="text"
                value={nomePet}
                onChange={(e) => setNomePet(e.target.value)}
                placeholder="Ex: Rex"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group-moderno">
            <label>Espécie</label>
            <div className="input-wrapper">
              <Cat size={20} className="input-icon-left" />
              <input
                type="text"
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                placeholder="Ex: Cachorro, Gato..."
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group-moderno">
            <label>Idade (anos)</label>
            <div className="input-wrapper">
              <Calendar size={20} className="input-icon-left" />
              <input
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Ex: 5"
                min="0"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group-moderno">
            <label>Nome do Tutor</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon-left" />
              <input
                type="text"
                value={tutor}
                onChange={(e) => setTutor(e.target.value)}
                placeholder="Nome do responsável"
                disabled={loading}
              />
            </div>
          </div>

          {/* Botão Salvar */}
          <button type="submit" className="btn-salvar-moderno" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="spin" size={20} /> Salvando...
              </>
            ) : (
              <>
                <PawPrint size={20} /> Cadastrar
              </>
            )}
          </button>

          {/* Mensagem de Feedback */}
          {mensagem && (
            <div className={`mensagem-box ${tipoMensagem}`}>
              {tipoMensagem === 'sucesso' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              {mensagem}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NovoCadastro;