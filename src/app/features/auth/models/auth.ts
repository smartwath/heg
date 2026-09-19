export interface LoginRequest {
  email: string;
  password?: string; // Users might use password, clients might use something else
  phone?: string;
}

export interface RegisterRequest {
  email?: string;
  password?: string;
  phone?: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user?: any;
  client?: any;
  expiresIn?: number;
}
