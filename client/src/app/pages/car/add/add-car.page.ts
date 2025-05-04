import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonButton,
  ToastOptions,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline, checkmarkCircleOutline, hourglassOutline } from 'ionicons/icons';
import { Car } from 'src/app/shared/models/car';
import { CarService } from 'src/app/shared/services/car.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonLabel,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonInput,
    IonCard,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    ReactiveFormsModule,
  ],
})
export class AddCarPage {
  loadingToastOptions: ToastOptions = {
    message: 'Saving car...',
    position: 'top',
    icon: 'hourglass-outline',
  };

  successToastOptions: ToastOptions = {
    message: 'Car saved successfully!',
    duration: 2000,
    icon: 'checkmark-circle-outline',
    position: 'top',
    color: 'success',
  };

  errorToastOptions: ToastOptions = {
    message: 'Failed to save the car. Please try again.',
    duration: 2000,
    icon: 'alert-circle-outline',
    position: 'top',
    color: 'danger',
  };

  formatOptions = {
    date: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  };

  availableFrom = new Date().toISOString();
  availableTo = new Date().toISOString();

  carForm = new FormGroup({
    imageUrl: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    modelName: new FormControl('', [Validators.required]),
    dailyPrice: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private toastService: ToastService,
    private carService: CarService
  ) {
    addIcons({ hourglassOutline, checkmarkCircleOutline, alertCircleOutline });
  }

  get imageUrl(): string {
    return this.carForm.get('imageUrl')?.value ?? '';
  }

  get brand(): string {
    return this.carForm.get('brand')?.value ?? '';
  }

  get modelName(): string {
    return this.carForm.get('modelName')?.value ?? '';
  }

  get dailyPrice(): number {
    return this.carForm.get('dailyPrice')?.value ?? 0;
  }

  get isFormValid(): boolean {
    return this.carForm.valid;
  }

  save(): void {
    this.toastService.presentClosableToast(this.loadingToastOptions);

    const car: Car = {
      imageUrl: this.imageUrl,
      brand: this.brand,
      modelName: this.modelName,
      dailyPrice: this.dailyPrice,
      availableFrom: new Date(this.availableFrom),
      availableTo: new Date(this.availableTo),
    };

    this.carService.createCar(car).subscribe({
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
