import { TestBed } from '@angular/core/testing';
import { NationalId } from './national-id';

describe('NationalId', () => {
  let service: NationalId;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalId);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should extract birth date correctly for a 1900s Egyptian National ID', () => {
    // 2 (century 1900) + 95 (year 1995) + 08 (August) + 15 (15th) + 01 (Cairo) + 001 (sequence) + 1 (odd male) + 5
    const id = '29508150100115';
    const result = service.parse(id);

    expect(result).not.toBeNull();
    expect(result?.birthDate).toBe('1995-08-15');
    expect(result?.year).toBe(1995);
    expect(result?.month).toBe(8);
    expect(result?.day).toBe(15);
    expect(result?.governorate).toBe('القاهرة');
    expect(result?.gender).toBe('male');
  });

  it('should extract birth date correctly for a 2000s Egyptian National ID', () => {
    // 3 (century 2000) + 02 (year 2002) + 03 (March) + 20 (20th) + 21 (Giza) + 004 (sequence) + 2 (even female) + 8
    const id = '30203202100428';
    const result = service.parse(id);

    expect(result).not.toBeNull();
    expect(result?.birthDate).toBe('2002-03-20');
    expect(result?.year).toBe(2002);
    expect(result?.month).toBe(3);
    expect(result?.day).toBe(20);
    expect(result?.governorate).toBe('الجيزة');
    expect(result?.gender).toBe('female');
  });

  it('should handle 16 digits input gracefully by extracting birth date', () => {
    // 16 digits starting with 14-digit Egyptian ID
    const id = '2901225010023499';
    const birthDate = service.extractBirthDate(id);

    expect(birthDate).toBe('1990-12-25');
  });

  it('should return null for invalid national IDs', () => {
    expect(service.parse('')).toBeNull();
    expect(service.parse('12345')).toBeNull();
    // Invalid month 13
    expect(service.parse('29513150100115')).toBeNull();
    // Invalid day 35
    expect(service.parse('29501350100115')).toBeNull();
    // Invalid century 5
    expect(service.parse('59501150100115')).toBeNull();
  });
});
