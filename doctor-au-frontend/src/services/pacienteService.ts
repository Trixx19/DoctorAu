import api from './api';

export interface Pet {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  tutor?: string;
}

// Busca todos os pets (o backend deve filtrar os seus)
export async function getPacientes(): Promise<Pet[]> {
  try {
    const response = await api.get<Pet[]>('/pets/');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    throw error;
  }
}

// Busca um pet específico pelo ID
export async function getPacienteById(id: number): Promise<Pet> {
  const response = await api.get<Pet>(`/pets/${id}`);
  return response.data;
}