import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type UserRole = "ADMIN" | "MEDICO" | "CLIENTE";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // Não está logado
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Se não houver restrição de perfil, apenas deixa passar
  if (!allowedRoles) {
    return <>{children}</>;
  }

  const parsedUser = JSON.parse(user) as { perfil: UserRole };

  // Perfil não autorizado
  if (!allowedRoles.includes(parsedUser.perfil)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
