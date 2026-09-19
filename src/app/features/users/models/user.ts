export interface User {
  id: number;
  email: string;
  phone?: string;
  role?: string;
  username?: string;
  password?: string;
  status?: 'pending' | 'accepted' | 'rejected' | string;
  createdAt?: string;
  updatedAt?: string;
}
