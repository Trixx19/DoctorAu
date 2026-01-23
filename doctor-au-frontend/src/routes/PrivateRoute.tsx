import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type UserRole = "ADMIN" | "MEDICO" | "CLIENTE";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  
 
  const userString = localStorage.getItem("usuario_logado");

  // Verificação Se não tem token ou user salvo, vai pro login
  if (!token || !userString) {
    // Limpa tudo para garantir que não sobrou lixo
    localStorage.removeItem("token");
    localStorage.removeItem("usuario_logado");
    return <Navigate to="/login" replace />;
  }

  //
  let user: { perfil: UserRole };
  
  try {
    user = JSON.parse(userString);
  } catch (error) {
    console.error("Erro ao ler dados do usuário no PrivateRoute", error);
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }


  if (!allowedRoles) {
    return <>{children}</>;
  }

  // Se tiver restrição, verifica se o perfil bate
  if (!allowedRoles.includes(user.perfil)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;