import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { getPacientes, type Paciente } from '../../services/mockData';
import './Feed.css';

const Feed = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'adm' && role !== 'medico') {
      alert('Acesso negado: Apenas médicos podem ver prontuários.');
      navigate('/dashboard');
      return;
    }

    getPacientes().then((dados) => {
      setPacientes(dados);
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return <div className="feed-container"><p>A carregar...</p></div>;
  }

  return (
    <div className="feed-container">
        <header className="feed-header">
            <h1>Prontuários Veterinários 🐾</h1>
            <Link to="/" className="btn-logout">Sair</Link>
        </header>
        <div className="cards-grid">
            {pacientes.map((paciente) => (
            <div key={paciente.id} className="patient-card">
                <h3>{paciente.nome}</h3>
                <div className="patient-info">
                <p><strong>Espécie:</strong> {paciente.especie} ({paciente.raca})</p>
                <p><strong>Tutor:</strong> {paciente.tutor}</p>
                <p><strong>Idade:</strong> {paciente.idade} anos</p>
                </div>
                <Link to={`/detalhe/${paciente.id}`} className="btn-detalhes">
                Ver Prontuário Completo
                </Link>
            </div>
            ))}
        </div>
    </div>
  );
};

export default Feed;