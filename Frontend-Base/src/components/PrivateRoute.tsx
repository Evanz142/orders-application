import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
