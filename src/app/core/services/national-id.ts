import { Injectable } from '@angular/core';
import { NationalIdInfo } from '../models/national-id-info';

const GOVERNORATES: Record<string, string> = {
  '01': 'القاهرة',
  '02': 'الإسكندرية',
  '03': 'بورسعيد',
  '04': 'السويس',
  '11': 'دمياط',
  '12': 'الدقهلية',
  '13': 'الشرقية',
  '14': 'القليوبية',
  '15': 'كفر الشيخ',
  '16': 'الغربية',
  '17': 'المنوفية',
  '18': 'البحيرة',
  '19': 'الإسماعيلية',
  '21': 'الجيزة',
  '22': 'بني سويف',
  '23': 'الفيوم',
  '24': 'المنيا',
  '25': 'أسيوط',
  '26': 'سوهاج',
  '27': 'قنا',
  '28': 'أسوان',
  '29': 'الأقصر',
  '31': 'البحر الأحمر',
  '32': 'الوادي الجديد',
  '33': 'مطروح',
  '34': 'شمال سيناء',
  '35': 'جنوب سيناء',
  '88': 'خارج الجمهورية',
};

const ARABIC_MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

@Injectable({
  providedIn: 'root',
})
export class NationalId {
  /**
   * يستخرج بيانات الهوية وتاريخ الميلاد من الرقم القومي المصري.
   * يدعم أرقام البطاقة القياسية 14 رقماً، وأيضاً حتى 16 رقماً لتغطية مختلف حالات الإدخال.
   */
  parse(rawId: string): NationalIdInfo | null {
    if (!rawId) {
      return null;
    }

    // تنظيف المدخلات من الفراغات والرموز
    const cleaned = rawId.replace(/\D/g, '');

    // الرقم القومي المصري 14 رقماً (وإذا زاد حتى 16 رقماً نستخلص من أول 14 رقماً)
    if (cleaned.length < 14) {
      return null;
    }

    const centuryDigit = cleaned.charAt(0);
    let century = 0;
    if (centuryDigit === '2') {
      century = 1900;
    } else if (centuryDigit === '3') {
      century = 2000;
    } else {
      return null;
    }

    const yearPart = parseInt(cleaned.substring(1, 3), 10);
    const monthPart = parseInt(cleaned.substring(3, 5), 10);
    const dayPart = parseInt(cleaned.substring(5, 7), 10);

    const fullYear = century + yearPart;

    // التحقق من صحة الشهر
    if (monthPart < 1 || monthPart > 12) {
      return null;
    }

    // التحقق من صحة اليوم بحسب الشهر والسنة
    const daysInMonth = new Date(fullYear, monthPart, 0).getDate();
    if (dayPart < 1 || dayPart > daysInMonth) {
      return null;
    }

    const formattedMonth = String(monthPart).padStart(2, '0');
    const formattedDay = String(dayPart).padStart(2, '0');
    const birthDate = `${fullYear}-${formattedMonth}-${formattedDay}`;

    // استخراج المحافظة
    const govCode = cleaned.substring(7, 9);
    const governorate = GOVERNORATES[govCode] || 'أخرى';

    // استخراج النوع (الرقم الـ 13 فردي للذكور وزوجي للإناث)
    const genderDigit = parseInt(cleaned.charAt(12), 10);
    const isMale = genderDigit % 2 !== 0;

    return {
      isValid: true,
      birthDate,
      formattedDateArabic: `${dayPart} ${ARABIC_MONTHS[monthPart - 1]} ${fullYear}`,
      year: fullYear,
      month: monthPart,
      day: dayPart,
      governorate,
      gender: isMale ? 'male' : 'female',
      genderLabel: isMale ? 'ذكر' : 'أنثى',
    };
  }

  /**
   * يسترجع تاريخ الميلاد بصيغة YYYY-MM-DD مباشرة إذا كان الرقم صالحاً
   */
  extractBirthDate(rawId: string): string | null {
    const info = this.parse(rawId);
    return info ? info.birthDate : null;
  }
}
