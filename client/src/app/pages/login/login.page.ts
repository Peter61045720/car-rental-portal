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
  ToastOptions,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { addIcons } from 'ionicons';
import { alertCircleOutline, checkmarkCircleOutline, hourglassOutline } from 'ionicons/icons';
import { ToastService } from 'src/app/shared/services/toast.service';

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
  loadingToastOptions: ToastOptions = {
    message: 'Logging in...',
    position: 'top',
    icon: 'hourglass-outline',
  };

  successToastOptions: ToastOptions = {
    message: 'Login Successful!',
    duration: 2000,
    icon: 'checkmark-circle-outline',
    position: 'top',
    color: 'success',
  };

  errorToastOptions: ToastOptions = {
    message: 'Login Failed!',
    duration: 2000,
    icon: 'alert-circle-outline',
    position: 'top',
    color: 'danger',
  };

  loginFrom = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    addIcons({ hourglassOutline, checkmarkCircleOutline, alertCircleOutline });
  }

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
    this.toastService.presentClosableToast(this.loadingToastOptions);
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.authService.checkAuth().subscribe(data => {
          this.toastService.close();
          this.toastService.presentToast(this.successToastOptions);
          if (data.user?.isAdmin) {
            this.router.navigateByUrl('/admin/cars');
          } else {
            this.router.navigateByUrl('/user/cars');
          }
        });
      },
      error: () => {
        this.toastService.close();
        this.toastService.presentToast(this.errorToastOptions);
      },
    });
  }
}
