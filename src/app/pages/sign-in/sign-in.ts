import { Component } from '@angular/core';
import { LoginHero } from './components/login-hero/login-hero';
import { LoginFeatures } from './components/login-features/login-features';

@Component({
  selector: 'app-sign-in',
  imports: [LoginHero, LoginFeatures],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {}
