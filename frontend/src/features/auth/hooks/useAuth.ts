import { useState, useEffect } from "react";
import { User } from "../types/auth";
import { authApi } from "../services/auth.api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setUser({
        id: 1,
        email: "citizen@example.com",
        fullName: "Citizen User",
        role: "USER",
        emailVerified: true,
      });
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem("token", data.access_token);
      setToken(data.access_token);
      setUser({
        id: data.user_id,
        email: data.email,
        fullName: "Verified Citizen",
        role: "USER",
        emailVerified: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };
}

export default useAuth;
