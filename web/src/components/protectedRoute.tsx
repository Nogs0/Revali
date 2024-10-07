import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ajuste a importação se necessário

interface ProtectedRouteProps {
  element: JSX.Element;
}

const isTokenValid = (): boolean => {
  const token = localStorage.getItem("token-validate");
  if (!token) return false;

  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000; // em segundos
    return decodedToken.exp > currentTime; // Verifica se o token expirou
  } catch (error) {
    return false; // Se houver algum erro ao decodificar
  }
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  if (isTokenValid()) {
    return element;
  } else {
    localStorage.clear();
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
