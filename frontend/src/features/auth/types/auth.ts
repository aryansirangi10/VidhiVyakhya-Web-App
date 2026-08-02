export interface User {
  id: number;
  email: string;
  fullName: string;
  role: "USER" | "REVIEWER" | "ADMIN";
  emailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
