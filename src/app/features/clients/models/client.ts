export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateClientStatusRequest {
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
}
