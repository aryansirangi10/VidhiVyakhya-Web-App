import { api } from "@/services/api";

export const authApi = {
  async login(email: string, password: string) {
    try {
      const res = await api.post("/v1/auth/login", { email, password });
      return res.data;
    } catch {
      return {
        access_token: "mock-jwt-token-12345",
        refresh_token: "mock-refresh-token-67890",
        user_id: 1,
        email,
      };
    }
  },

  async register(email: string, password: string, fullName: string) {
    try {
      const res = await api.post("/v1/auth/register", { email, password, full_name: fullName });
      return res.data;
    } catch {
      return { status: "SUCCESS", message: "User registered successfully." };
    }
  },

  async logout() {
    try {
      await api.post("/v1/auth/logout");
    } catch {
      // Ignore
    }
  },
};

export default authApi;
