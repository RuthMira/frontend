import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, setAuthToken } from "../api/api";

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (nome: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = async (nome: string, senha: string) => {
    const { data } = await api.post("/auth/login", { nome, senha });
    setToken(data.access_token);
    setAuthToken(data.access_token);
    localStorage.setItem("token", data.access_token);

    const base64Payload = data.access_token.split(".")[1];
    const decoded = JSON.parse(atob(base64Payload));
    setUser({ id: decoded.sub, nome: decoded.nome, cargo: decoded.cargo });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  useEffect(() => {
    setAuthToken(token);
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decoded = JSON.parse(atob(base64Payload));
        setUser({ id: decoded.sub, nome: decoded.nome, cargo: decoded.cargo });
      } catch (e) {
        setUser(null);
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
