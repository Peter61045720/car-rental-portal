import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonLabel,
  IonButton,
  IonInput,
  ToastOptions,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline, checkmarkCircleOutline, hourglassOutline } from 'ionicons/icons';
import { Extra } from 'src/app/shared/models/extra';
import { ExtraService } from 'src/app/shared/services/extra.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-extra',
  templateUrl: './add-extra.page.html',
  styleUrls: ['./add-extra.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
  ],
})
export class AddExtraPage {
  loadingToastOptions: ToastOptions = {
    message: 'Saving extra...',
    position: 'top',
    icon: 'hourglass-outline',
  };

  successToastOptions: ToastOptions = {
    message: 'Extra saved successfully!',
    duration: 2000,
    icon: 'checkmark-circle-outline',
    position: 'top',
    color: 'success',
  };

  errorToastOptions: ToastOptions = {
    message: 'Failed to save the extra. Please try again.',
    duration: 2000,
    icon: 'alert-circle-outline',
    position: 'top',
    color: 'danger',
  };

  extraForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    dailyPrice: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private toastService: ToastService,
    private extraService: ExtraService
  ) {
    addIcons({ hourglassOutline, checkmarkCircleOutline, alertCircleOutline });
  }

  get name(): string {
    return this.extraForm.get('name')?.value ?? '';
  }

  get description(): string {
    return this.extraForm.get('description')?.value ?? '';
  }

  get dailyPrice(): number {
    return this.extraForm.get('dailyPrice')?.value ?? 0;
  }

  get isFormValid(): boolean {
    return this.extraForm.valid;
  }

  save(): void {
    this.toastService.presentClosableToast(this.loadingToastOptions);

    const extra: Extra = {
      name: this.name,
      description: this.description,
      dailyPrice: this.dailyPrice,
    };

    this.extraService.createExtra(extra).subscribe({
      next: () => {
        this.toastService.close();
        this.toastService.presentToast(this.successToastOptions);
        this.router.navigateByUrl('/admin/cars');
      },
      error: () => {
        this.toastService.close();
        this.toastService.presentToast(this.errorToastOptions);
      },
    });
  }
}
