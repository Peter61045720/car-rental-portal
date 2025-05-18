import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonSpinner,
  ToastOptions,
} from '@ionic/angular/standalone';
import { CarService } from 'src/app/shared/services/car.service';
import { Car } from 'src/app/shared/models/car';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonButton,
    IonCardHeader,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    CommonModule,
    FormsModule,
  ],
})
export class CarListPage implements OnInit {
  loadingToastOptions: ToastOptions = {
    message: 'Deleting car...',
    position: 'top',
    icon: 'hourglass-outline',
  };

  successToastOptions: ToastOptions = {
    message: 'Car deleted successfully!',
    duration: 2000,
    icon: 'checkmark-circle-outline',
    position: 'top',
    color: 'success',
  };

  errorToastOptions: ToastOptions = {
    message: 'Failed to delete the car. Please try again.',
    duration: 2000,
    icon: 'alert-circle-outline',
    position: 'top',
    color: 'danger',
  };

  cars = signal<Car[]>([]);
  isLoading = true;
  isAdmin = false;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.fetchCars();
  }

  async getRole(): Promise<void> {
    this.isAdmin = (await firstValueFrom(this.authService.checkAuth())).user?.isAdmin ?? false;
  }

  fetchCars(): void {
    this.cars.set([]);

    this.carService.getAllCars().subscribe(cars => {
      this.isLoading = false;
      this.cars.set(cars);
    });
  }

  viewCar(id?: string): void {
    this.router.navigateByUrl(`/app/car/${id}`);
  }

  delete(id?: string): void {
    if (id) {
      this.toastService.presentClosableToast(this.loadingToastOptions);
      this.carService.deleteCar(id).subscribe({
        next: () => {
          this.toastService.close();
          this.toastService.presentToast(this.successToastOptions);
          this.fetchCars();
        },
        error: () => {
          this.toastService.close();
          this.toastService.presentToast(this.errorToastOptions);
        },
      });
    }
  }
}
