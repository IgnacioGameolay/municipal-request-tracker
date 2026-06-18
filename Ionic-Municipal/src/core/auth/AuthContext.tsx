import React, {
  createContext,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  AuthSession,
  UsuarioApi,
  cerrarSesionApi,
  guardarSesion,
  meApi,
  obtenerTokenSesion,
  obtenerUsuarioSesion,
  rolApiToFrontend,
} from "../../features/auth/data/authApi";

export type Role = "solicitante" | "funcionario";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: Role | null;
  user: UsuarioApi | null;

  setSession: (session: AuthSession) => void;

  login: (session: AuthSession) => void;

  refreshSession: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UsuarioApi | null>(() =>
    obtenerUsuarioSesion()
  );

  const [role, setRole] = useState<Role | null>(() => {
    const usuario = obtenerUsuarioSesion();
    return usuario ? rolApiToFrontend(usuario.rol) : null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(!!obtenerTokenSesion());

  const logout = useCallback(() => {
    // Limpieza de toda la sesión usando la API
    cerrarSesionApi();

    localStorage.removeItem('rol_actual');
    localStorage.removeItem('usuario_actual');
    sessionStorage.clear();

    // Resetear estado del contexto
    setUser(null);
    setRole(null);
    setIsLoading(false);
  }, []);

  const setSession = useCallback((session: AuthSession) => {
    guardarSesion(session);
    setUser(session.user);
    setRole(rolApiToFrontend(session.user.rol));
    setIsLoading(false);
  }, []);

  const refreshSession = useCallback(async () => {
    const token = obtenerTokenSesion();

    if (!token) {
      logout();
      return;
    }

    setIsLoading(true);

    try {
      const usuario = await meApi();

      setUser(usuario);
      setRole(rolApiToFrontend(usuario.rol));

      localStorage.setItem("usuario_actual", JSON.stringify(usuario));
      localStorage.setItem("rol_actual", rolApiToFrontend(usuario.rol));
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    refreshSession();

    const handleSesionExpirada = () => {
      logout();
    };

    window.addEventListener("sesionExpirada", handleSesionExpirada);

    return () => {
      window.removeEventListener("sesionExpirada", handleSesionExpirada);
    };
  }, [refreshSession, logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user && !!obtenerTokenSesion(),
        isLoading,
        role,
        user,
        setSession,
        login: setSession,
        refreshSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
};