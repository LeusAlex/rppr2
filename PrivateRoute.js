import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
