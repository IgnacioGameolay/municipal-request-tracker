import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth, Role } from "../auth/AuthContext";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  allowedRole: Role;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  allowedRole,
  ...rest
}) => {
  const { isAuthenticated, isLoading, role } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return null;
        }

        if (!isAuthenticated || !role) {
          return <Redirect to="/login" />;
        }

        if (role !== allowedRole) {
          const fallbackPath =
            role === "funcionario"
              ? "/funcionario/tramites"
              : "/ciudadano/tramites";

          return <Redirect to={fallbackPath} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};