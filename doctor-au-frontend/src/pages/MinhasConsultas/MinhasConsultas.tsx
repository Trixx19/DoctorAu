import "./MinhasConsultas.css";

interface Consulta {
  id: number;
  pet: string;
  medico: string;
  data: string;
  status: "AGENDADA" | "CONCLUIDA" | "CANCELADA";
}

const MinhasConsultas = () => {
  const consultas: Consulta[] = [
    {
      id: 1,
      pet: "Rex",
      medico: "Dr. João",
      data: "20/01/2026 - 14:00",
      status: "AGENDADA",
    },
    {
      id: 2,
      pet: "Mimi",
      medico: "Dra. Ana",
      data: "05/01/2026 - 09:30",
      status: "CONCLUIDA",
    },
  ];

  return (
    <div className="consultas-container">
      <h1>Minhas Consultas</h1>

      <div className="consultas-list">
        {consultas.map((consulta) => (
          <div key={consulta.id} className="consulta-card">
            <div>
              <h3>{consulta.pet}</h3>
              <p>Médico: {consulta.medico}</p>
              <span>{consulta.data}</span>
            </div>

            <span
              className={`status ${consulta.status.toLowerCase()}`}
            >
              {consulta.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinhasConsultas;
