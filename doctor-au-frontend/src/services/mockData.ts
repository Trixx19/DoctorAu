export interface Paciente {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  tutor: string;
  idade: number;
  historico: string;
}

export interface Consulta {
  id: number;
  petId: number;
  nomePet: string;
  tutor: string;
  data: string;
  horario: string;
  tipo: string;
  status: 'Agendada' | 'Concluída' | 'Cancelada';
}

export const listaPacientes: Paciente[] = [
  { id: 1, nome: "Rex", especie: "Cão", raca: "Golden Retriever", tutor: "João Silva", idade: 5, historico: "Vacinação em dia." },
  { id: 2, nome: "Mimi", especie: "Gato", raca: "Siamês", tutor: "Ana Costa", idade: 2, historico: "Apresentou febre leve." },
  { id: 3, nome: "Thor", especie: "Cão", raca: "Bulldog", tutor: "Carlos Pereira", idade: 3, historico: "Dermatite tratada." }
];

export const listaConsultas: Consulta[] = [
  { id: 101, petId: 1, nomePet: "Rex", tutor: "João Silva", data: "2025-06-15", horario: "14:00", tipo: "Check-up Anual", status: 'Agendada' },
  { id: 102, petId: 2, nomePet: "Mimi", tutor: "Ana Costa", data: "2025-06-15", horario: "15:30", tipo: "Vacinação", status: 'Agendada' },
];

export const getPacientes = (): Promise<Paciente[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(listaPacientes), 500));
};

export const getPacienteById = (id: number): Promise<Paciente | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const paciente = listaPacientes.find((p) => p.id === id);
      resolve(paciente);
    }, 500);
  });
};


export const getConsultas = (): Promise<Consulta[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(listaConsultas), 500));
};