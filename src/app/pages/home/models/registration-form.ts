export interface RegistrationForm {
  username: string;
  password: string;
  fullName: string;
  phone: string;
  nationalId: string;
  birthDate: string;
  idExpiryDate: string;
  isExistingClient: 'yes' | 'no';
  product: 'cards' | 'account' | 'salary';
  agreedToTerms: boolean;
}
