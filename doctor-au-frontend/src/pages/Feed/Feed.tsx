import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../../services/api';
import PacienteCard from '../../components/ParcienteCard/PacienteCard'; 

interface Paciente {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  raca?: string;
  tutor?: string;
}

const Feed = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario_logado");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.perfil === "CLIENTE") {
        navigate("/dashboard"); 
        return;
      }
    }

    async function carregarPacientes() {
      try {

        const response = await api.get<Paciente[]>('/pets/');
        setPacientes(response.data);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarPacientes();
  }, [navigate]);

  const pacientesFiltrados = pacientes.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    (p.tutor && p.tutor.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <div className="feed-container">
      <div className="feed-header">
        <div className="header-title">
          <h1>Pacientes 🐾</h1>
          <p>Gerenciamento de prontuários e histórico.</p>
        </div>
        
        {/* Barra de Busca */}
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou tutor..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Carregando lista de pacientes...</p>
        </div>
      ) : pacientesFiltrados.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum paciente encontrado.</p>
        </div>
      ) : (
        <div className="feed-grid">
          {pacientesFiltrados.map((paciente) => (
            <PacienteCard key={paciente.id} paciente={paciente} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;