import api from './api';
import type { User } from '../types/User';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

// Dados necessários para criar conta
export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  perfil: "CLIENTE" | "MEDICO" | "ADMIN";
}

export async function login(email: string, senha: string): Promise<User> {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', senha);

  try {
    const { data } = await api.post<LoginResponse>('/token', formData);
    localStorage.setItem('token', data.access_token);

    const userResponse = await api.get<User>('/users/me');
    return userResponse.data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

// --- CADASTRAR ---
export async function register(data: RegisterData): Promise<User> {
  try {
    // Envia os dados para a rota POST /users/ do Python
    const response = await api.post<User>('/users/', data);
    return response.data;
  } catch (error) {
    console.error("Erro no cadastro:", error);
    throw error; 
  }
}
// ------------------------------

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario_logado');
  window.location.href = '/login';
}