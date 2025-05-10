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
  ToastOptions,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from 'src/app/shared/validators/password-match.validator';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { ToastService } from 'src/app/shared/services/toast.service';

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
  loadingToastOptions: ToastOptions = {
    message: 'Registering...',
    position: 'top',
    icon: 'hourglass-outline',
  };

  successToastOptions: ToastOptions = {
    message: 'Registration successful!',
    duration: 2000,
    icon: 'checkmark-circle-outline',
    position: 'top',
    color: 'success',
  };

  errorToastOptions: ToastOptions = {
    message: 'Registration Failed!',
    duration: 2000,
    icon: 'alert-circle-outline',
    position: 'top',
    color: 'danger',
  };

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
    private toastService: ToastService,
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
    this.toastService.presentClosableToast(this.loadingToastOptions);

    const user: User = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.toastService.close();
        this.toastService.presentToast(this.successToastOptions);
        this.router.navigateByUrl('/app/cars');
      },
      error: () => {
        this.toastService.close();
        this.toastService.presentToast(this.errorToastOptions);
      },
    });
  }
}
