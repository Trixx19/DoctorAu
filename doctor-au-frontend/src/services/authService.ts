import type { User } from "../types/User";

export function loginMock(email: string): User {
  const perfil =
    email.includes("admin")
      ? "ADMIN"
      : email.includes("medico")
      ? "MEDICO"
      : "CLIENTE";

  return {
    nome:
      perfil === "ADMIN"
        ? "Administrador"
        : perfil === "MEDICO"
        ? "Dr(a). Usuário"
        : "Usuário",
    email,
    perfil,
  };
}
