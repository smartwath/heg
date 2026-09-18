import { Component } from '@angular/core';
import { OtpVerification } from './components/otp-verification/otp-verification';

@Component({
  selector: 'app-otp',
  imports: [OtpVerification],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {}
