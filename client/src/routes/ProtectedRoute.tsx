import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  allowedRole: 'solicitante' | 'funcionario';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  allowedRole,
  ...rest
}) => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }

        if (role !== allowedRole) {
          const fallbackPath = role === 'funcionario' ? '/admin/bandeja' : '/ciudadano/tramites';
          return <Redirect to={fallbackPath} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};