export interface ClientOtp {
  id: string;
  otp: string;
  status: string;
  clientId: string;
}

export interface Client {
  ClientId?: string;
  id?: string;
  username?: string;
  password?: string;
  fullName?: string;
  nationalId?: string;
  birthDate?: string;
  idExpiryDate?: string;
  phone?: string;
  status: string;
  otps?: ClientOtp[];
}

export interface UpdateClientStatusRequest {
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING';
}
