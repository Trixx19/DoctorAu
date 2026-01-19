export type UserRole = "CLIENTE" | "MEDICO" | "ADMIN";

export interface User {
  nome: string;
  email: string;
  perfil: UserRole;
}
