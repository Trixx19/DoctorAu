import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import './Detalhe.css';

interface PacienteDetalhe {
  id: number;
  nome: string;
  especie: string;
  raca?: string;
  idade: number;
  cor?: string;
  peso?: number;
  dono?: {
    nome: string;
    email: string;
  };
  historico_medico?: string; 
}

const Detalhe = () => {
  const { id } = useParams<{ id: string }>();
  const [paciente, setPaciente] = useState<PacienteDetalhe | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarDetalhes() {
      if (!id) return;

      try {
        const response = await api.get<PacienteDetalhe>(`/pets/${id}`);
        setPaciente(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
        setErro('Não foi possível carregar as informações deste paciente.');
      } finally {
        setLoading(false);
      }
    }

    carregarDetalhes();
  }, [id]);

  if (loading) {
    return (
      <div className="detalhe-container">
        <div className="loading">Carregando detalhes...</div>
      </div>
    );
  }

  if (erro || !paciente) {
    return (
      <div className="detalhe-container">
        <div className="detalhe-card">
          <h2>Paciente não encontrado 😕</h2>
          <p>{erro || "Ocorreu um erro ao buscar os dados."}</p>
          <Link to="/pacientes" className="btn-voltar">Voltar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detalhe-container">
      <div className="detalhe-card">
        <header className="detalhe-header">
          <h1>{paciente.nome}</h1>
          <span className="tag-especie">
            {paciente.especie} {paciente.raca ? `- ${paciente.raca}` : ''}
          </span>
        </header>

        <div className="info-section">
          <h3>Dados do Tutor</h3>
          <p>
            <strong>Nome:</strong> {paciente.dono?.nome || "Informação não disponível"}
          </p>
          {paciente.dono?.email && (
            <p><strong>Contato:</strong> {paciente.dono.email}</p>
          )}
        </div>

        <div className="info-section">
          <h3>Dados do Paciente</h3>
          <p><strong>Idade:</strong> {paciente.idade} anos</p>
          {paciente.peso && <p><strong>Peso:</strong> {paciente.peso} kg</p>}
          {paciente.cor && <p><strong>Cor:</strong> {paciente.cor}</p>}
        </div>

        <div className="info-section">
          <h3>Histórico Clínico (Prontuário)</h3>
          <div className="historico-box">
            {}
            {paciente.historico_medico || "Nenhum histórico clínico registrado no sistema para este paciente."}
          </div>
        </div>

        {}
        <Link to="/pacientes" className="btn-voltar">
          ← Voltar para a Lista
        </Link>
      </div>
    </div>
  );
};

export default Detalhe;