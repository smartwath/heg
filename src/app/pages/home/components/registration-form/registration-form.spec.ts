import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RegistrationFormComponent } from './registration-form';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should automatically populate birthDate when a valid Egyptian National ID is entered', () => {
    // 2 (1900) + 98 (1998) + 10 (October) + 15 (15th) + 01 (Cairo) + 0011 (male) + 5
    const testId = '29810150100115';
    component.updateField('nationalId', testId);

    expect(component.formData().birthDate).toBe('1998-10-15');
    expect(component.nationalIdInfo()?.governorate).toBe('القاهرة');
    expect(component.nationalIdInfo()?.gender).toBe('male');
  });

  it('should auto-populate birthDate for 2000s national ID', () => {
    // 3 (2000) + 03 (2003) + 05 (May) + 21 (21st) + 21 (Giza) + 0022 (female) + 4
    const testId = '30305212100224';
    component.updateField('nationalId', testId);

    expect(component.formData().birthDate).toBe('2003-05-21');
    expect(component.nationalIdInfo()?.governorate).toBe('الجيزة');
    expect(component.nationalIdInfo()?.gender).toBe('female');
  });
});
