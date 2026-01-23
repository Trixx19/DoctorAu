import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./MinhasConsultas.css";

interface Agendamento {
  id: number;
  data_horario: string;
  status: string;

  pet?: {
    nome: string;
    especie: string;
  };
  veterinario?: {
    nome: string;
  };
}

const MinhasConsultas = () => {
  const [consultas, setConsultas] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarConsultas() {
      try {
        const response = await api.get<Agendamento[]>("/agendamentos/");
        setConsultas(response.data);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarConsultas();
  }, []);

  const formatarDataHora = (isoString: string) => {
    const dataObj = new Date(isoString);
    const dia = dataObj.toLocaleDateString('pt-BR');
    const hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${dia} - ${hora}`;
  };

  return (
    <div className="consultas-container">
      <h1>Minhas Consultas</h1>

      {loading ? (
        <p style={{textAlign: "center", color: "#666"}}>Carregando histórico...</p>
      ) : consultas.length === 0 ? (
        <div className="empty-state" style={{textAlign: "center", padding: "2rem"}}>
          <p>Você ainda não tem consultas agendadas.</p>
          <Link to="/agendar" style={{color: "#10b981", fontWeight: "bold", textDecoration: "none"}}>
            Agendar agora
          </Link>
        </div>
      ) : (
        <div className="consultas-list">
          {consultas.map((consulta) => (
            <div key={consulta.id} className="consulta-card">
              <div>
                {}
                <h3>{consulta.pet?.nome || "Pet"}</h3>
                
                <p>
                  Médico: {consulta.veterinario?.nome || "Equipe DoctorAu"}
                </p>
                
                <span>{formatarDataHora(consulta.data_horario)}</span>
              </div>

              {}
              <span
                className={`status ${consulta.status.toLowerCase()}`}
              >
                {consulta.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinhasConsultas;