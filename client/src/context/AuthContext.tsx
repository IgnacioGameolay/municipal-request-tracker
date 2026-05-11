import React, { createContext, useContext, useEffect, useState } from 'react';

export type Role = 'solicitante' | 'funcionario';

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
  cambiarRol: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const obtenerRolGuardado = (): Role | null => {
  const rol = localStorage.getItem('rol_actual');

  if (rol === 'solicitante' || rol === 'funcionario') {
    return rol;
  }

  return null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [role, setRole] = useState<Role | null>(obtenerRolGuardado());

  const isAuthenticated = role !== null;

  const guardarRol = (nuevoRol: Role) => {
    localStorage.setItem('rol_actual', nuevoRol);
    setRole(nuevoRol);
    window.dispatchEvent(new Event('rolCambiado'));
  };

  const login = (nuevoRol: Role) => {
    guardarRol(nuevoRol);
  };

  const cambiarRol = (nuevoRol: Role) => {
    guardarRol(nuevoRol);
  };

  const logout = () => {
    localStorage.removeItem('rol_actual');
    setRole(null);
    window.dispatchEvent(new Event('rolCambiado'));
  };

  useEffect(() => {
    const sincronizarRol = () => {
      setRole(obtenerRolGuardado());
    };

    window.addEventListener('rolCambiado', sincronizarRol);
    window.addEventListener('storage', sincronizarRol);

    return () => {
      window.removeEventListener('rolCambiado', sincronizarRol);
      window.removeEventListener('storage', sincronizarRol);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        login,
        logout,
        cambiarRol
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return contexto;
};