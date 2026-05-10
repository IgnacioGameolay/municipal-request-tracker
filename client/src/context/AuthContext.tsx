import React, { createContext, useContext, ReactNode, useState } from 'react';

export type Role = 'solicitante' | 'funcionario';

interface AuthState {
  isAuthenticated: boolean;
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const getInitialRole = (): Role | null => {
  const storedRole = localStorage.getItem('rol_actual');

  if (storedRole === 'solicitante' || storedRole === 'funcionario') {
    return storedRole;
  }

  return null;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialRole = getInitialRole();

  const [role, setRole] = useState<Role | null>(initialRole);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialRole !== null);

  const login = (selectedRole: Role) => {
    localStorage.setItem('rol_actual', selectedRole);
    setRole(selectedRole);
    setIsAuthenticated(true);

    window.dispatchEvent(new Event('rolCambiado'));
  };

  const logout = () => {
    localStorage.removeItem('rol_actual');
    setRole(null);
    setIsAuthenticated(false);

    window.dispatchEvent(new Event('rolCambiado'));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return context;
};