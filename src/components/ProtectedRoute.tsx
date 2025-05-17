import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ProtectedRouteProps } from "../data/interfaces";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = "/login",
}) => {
  const { isAuthenticated, loading } = useAuth();

  // Mientras se verifica la autenticación, mostramos un loader
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  // Si no está autenticado, redirigimos al login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Si está autenticado, mostramos el contenido de la ruta
  return <Outlet />;
};

export default ProtectedRoute;
