
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsultas, type Consulta } from '../../services/mockData';
import './ConsultasMedico.css';

const ConsultasMedico = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    getConsultas().then((dados) => setConsultas(dados));
  }, []);

  return (
    <>
      <div className="consultas-container">
        <h1>Agenda do Mês 🗓️</h1>
        
        <div className="tabela-card">
          <table className="tabela-consultas">
            <thead>
              <tr>
                <th>Horário</th>
                <th>Data</th>
                <th>Paciente</th>
                <th>Tutor</th>
                <th>Tipo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((consulta) => (
                <tr key={consulta.id}>
                  <td className="hora-destaque">{consulta.horario}</td>
                  <td>{new Date(consulta.data).toLocaleDateString('pt-BR')}</td>
                  <td><strong>{consulta.nomePet}</strong></td>
                  <td>{consulta.tutor}</td>
                  <td>{consulta.tipo}</td>
                  <td>
                    <span className="status-badge">{consulta.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <Link to="/dashboard" className="btn-voltar-simples">← Voltar ao Dashboard</Link>
      </div>
    </>
  );
};

export default ConsultasMedico;