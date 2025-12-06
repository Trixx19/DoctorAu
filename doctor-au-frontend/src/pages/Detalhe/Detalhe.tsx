import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPacienteById, type Paciente } from '../../services/mockData';
import './Detalhe.css';

const Detalhe = () => {
  const { id } = useParams<{ id: string }>();

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPacienteById(Number(id)).then((dados) => {
        setPaciente(dados || null); 
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Carregando detalhes...</div>;
  }

  if (!paciente) {
    return (
      <div className="detalhe-container">
        <h2>Paciente não encontrado!</h2>
        <Link to="/feed">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="detalhe-container">
      <div className="detalhe-card">
        <header className="detalhe-header">
          <h1>{paciente.nome}</h1>
          <span className="tag-especie">{paciente.especie} - {paciente.raca}</span>
        </header>

        <div className="info-section">
          <h3>Dados do Tutor</h3>
          <p><strong>Nome:</strong> {paciente.tutor}</p>
        </div>

        <div className="info-section">
          <h3>Dados do Paciente</h3>
          <p><strong>Idade:</strong> {paciente.idade} anos</p>
        </div>

        <div className="info-section">
          <h3>Histórico Clínico (Prontuário)</h3>
          <div className="historico-box">
            {paciente.historico}
          </div>
        </div>

        <Link to="/feed" className="btn-voltar">
          ← Voltar para a Lista
        </Link>
      </div>
    </div>
  );
};

export default Detalhe;