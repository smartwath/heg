import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFeatures } from './login-features';

describe('LoginFeatures', () => {
  let component: LoginFeatures;
  let fixture: ComponentFixture<LoginFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFeatures],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFeatures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
