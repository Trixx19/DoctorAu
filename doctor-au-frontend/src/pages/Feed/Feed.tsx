import { useEffect, useState } from "react";
import { getPacientes } from "../../services/pacienteService";
import PacienteCard from "../../components/ParcienteCard/PacienteCard";

interface Paciente {
  id: number;
  nome: string;
  especie: string;
  idade: number;
}

const Feed = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPacientes()
      .then((data) => {
        setPacientes(data);
      })
      .catch(() => {
        setError("Erro ao carregar pacientes.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando pacientes...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (pacientes.length === 0) return <p>Nenhum paciente cadastrado.</p>;

  return (
    <div className="feed-container">
      <h1>Pacientes</h1>

      <div className="feed-grid">
        {pacientes.map((paciente) => (
          <PacienteCard key={paciente.id} paciente={paciente} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
