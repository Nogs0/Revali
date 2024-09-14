import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
 
  if(localStorage.getItem("token-validate"))
    return element
  else
    return <Navigate to="/"/>
};

export default ProtectedRoute;
