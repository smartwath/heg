export interface Otp {
  id: string;
  code: string;
  userId?: string;
  clientId?: string;
  expiresAt: string;
}

export interface CreateOtpRequest {
  userId?: string;
  clientId?: string;
}

export interface VerifyOtpRequest {
  code: string;
}
