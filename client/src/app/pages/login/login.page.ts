import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButton,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonCard,
    IonInput,
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class LoginPage {
  loginFrom = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  get email(): string {
    return this.loginFrom.get('email')?.value ?? '';
  }

  get password(): string {
    return this.loginFrom.get('password')?.value ?? '';
  }

  get isFormValid(): boolean {
    return this.loginFrom.valid;
  }

  login(): void {
    console.log('email:', this.email);
    console.log('password:', this.password);
  }
}
