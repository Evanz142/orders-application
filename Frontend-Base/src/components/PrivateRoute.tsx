import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../contexts/SessionContext';
import MenuAppBar from './MenuAppBar';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { session, loading } = useSession();

  if (loading) { // provide a loading page
    return <MenuAppBar textValue=''></MenuAppBar>
  }

  if (!session) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
