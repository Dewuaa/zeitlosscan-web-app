import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authApi } from "../services/api";

interface User {
  id: string;
  email: string;
  username: string;
  role: "READER" | "TRANSLATOR" | "EDITOR" | "ADMIN";
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("zl_token");
    const storedUser = localStorage.getItem("zl_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const { data } = await authApi.login({ email, password });
    localStorage.setItem("zl_token", data.token);
    localStorage.setItem("zl_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("zl_token");
    localStorage.removeItem("zl_user");
    setToken(null);
    setUser(null);
  }

  const isAdmin = user?.role === "ADMIN" || user?.role === "EDITOR";

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAdmin, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
