import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './ConsultasMedico.css';

interface Agendamento {
  id: number;
  data_horario: string; 
  status: string;
  observacoes?: string;

  pet?: {
    id: number;
    nome: string;
    especie: string;
    dono?: {
      nome: string;
    };
  };
}

const ConsultasMedico = () => {
  const [consultas, setConsultas] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarAgenda() {
      try {
        
        const response = await api.get<Agendamento[]>('/agendamentos/');
        setConsultas(response.data);
      } catch (error) {
        console.error("Erro ao carregar agenda:", error);
        alert("Não foi possível carregar sua agenda.");
      } finally {
        setLoading(false);
      }
    }
    carregarAgenda();
  }, []);

  const formatarData = (isoString: string) => {
    const data = new Date(isoString);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarHora = (isoString: string) => {
    const data = new Date(isoString);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="consultas-container">
        <h1>Agenda do Mês 🗓️</h1>
        
        {loading ? (
          <p style={{textAlign: 'center', color: '#666'}}>Carregando agenda...</p>
        ) : consultas.length === 0 ? (
          <div className="tabela-card" style={{textAlign: 'center', padding: '2rem'}}>
            <p>Nenhuma consulta agendada para os próximos dias.</p>
          </div>
        ) : (
          <div className="tabela-card">
            <table className="tabela-consultas">
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Data</th>
                  <th>Paciente</th>
                  <th>Espécie</th>
                  <th>Tutor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {consultas.map((consulta) => (
                  <tr key={consulta.id}>
                    <td className="hora-destaque">
                      {formatarHora(consulta.data_horario)}
                    </td>
                    <td>
                      {formatarData(consulta.data_horario)}
                    </td>
                    <td>
                      <strong>{consulta.pet?.nome || "Pet não inf."}</strong>
                    </td>
                    <td>{consulta.pet?.especie || "-"}</td>
                    <td>
                      {consulta.pet?.dono?.nome || "Cliente"}
                    </td>
                    <td>
                      <span className="status-badge">
                        {consulta.status || "Agendado"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <Link to="/dashboard" className="btn-voltar-simples">← Voltar ao Dashboard</Link>
      </div>
    </>
  );
};

export default ConsultasMedico;