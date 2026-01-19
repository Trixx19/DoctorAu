interface Paciente {
  id: number;
  nome: string;
  especie: string;
  idade: number;
}

const pacientesMock: Paciente[] = [
  { id: 1, nome: "Rex", especie: "Cachorro", idade: 4 },
  { id: 2, nome: "Mimi", especie: "Gato", idade: 2 },
];

export function getPacientes(): Promise<Paciente[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pacientesMock);
    }, 800);
  });
}
