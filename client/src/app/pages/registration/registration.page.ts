import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonInput,
  IonCardContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonNote,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from 'src/app/shared/validators/password-match.validator';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [
    IonNote,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonButton,
    IonCardContent,
    IonInput,
    IonContent,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class RegistrationPage {
  registrationFrom = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    },
    passwordMatchValidator('password', 'confirmPassword')
  );

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  get confirmPasswordControl(): AbstractControl<string | null, string | null> | null {
    return this.registrationFrom.get('confirmPassword');
  }

  get username(): string {
    return this.registrationFrom.get('username')?.value ?? '';
  }

  get email(): string {
    return this.registrationFrom.get('email')?.value ?? '';
  }

  get password(): string {
    return this.registrationFrom.get('password')?.value ?? '';
  }

  get confirmPassword(): string {
    return this.confirmPasswordControl?.value ?? '';
  }

  get isFormValid(): boolean {
    return this.registrationFrom.valid;
  }

  register(): void {
    const user: User = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(user).subscribe(() => {
      console.log('Registration was successful!');

      //this.router.navigateByUrl('/cars');
    });
  }
}
