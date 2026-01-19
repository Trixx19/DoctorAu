import { useNavigate } from "react-router-dom";

interface Paciente {
  id: number;
  nome: string;
  especie: string;
  idade: number;
}

interface PacienteCardProps {
  paciente: Paciente;
}

const PacienteCard = ({ paciente }: PacienteCardProps) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/detalhe/${paciente.id}`);
  }

  return (
    <div className="patient-card" onClick={handleClick}>
      <h3>{paciente.nome}</h3>
      <p>Espécie: {paciente.especie}</p>
      <p>Idade: {paciente.idade} anos</p>
    </div>
  );
};

export default PacienteCard;
