export interface RegistrationForm {
  fullName: string;
  phone: string;
  nationalId: string;
  isExistingClient: 'yes' | 'no';
  product: 'cards' | 'account' | 'salary';
  agreedToTerms: boolean;
}
