export interface NationalIdInfo {
  isValid: boolean;
  birthDate: string; // YYYY-MM-DD format
  formattedDateArabic: string; // e.g. 15 أكتوبر 1998
  year: number;
  month: number;
  day: number;
  governorate: string; // e.g. القاهرة
  gender: 'male' | 'female';
  genderLabel: string; // ذكر / أنثى
}
