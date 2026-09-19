export interface Otp {
  id: string;
  otp: string;
  clientId: string;
}

export interface CreateOtpRequest {
  otp: string;
  clientId: string;
}

export interface VerifyOtpRequest {
  id: string
  otp: string;
}
