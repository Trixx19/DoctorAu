export interface User {
  id: number;
  nome: string;
  email: string;
  perfil: "ADMIN" | "MEDICO" | "CLIENTE";
  email_verificado?: boolean;
}