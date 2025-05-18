import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonDatetimeButton,
  IonDatetime,
  IonModal,
  IonButtons,
  ModalController,
  ToastOptions,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/shared/services/car.service';
import { Car } from 'src/app/shared/models/car';
import { RentalFormComponent } from 'src/app/shared/modals/rental-form/rental-form.component';
import { Rental } from 'src/app/shared/models/rental';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RentalService } from 'src/app/shared/services/rental.service';
import { firstValueFrom } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Extra } from 'src/app/shared/models/extra';
import { calculateTotalPrice } from 'src/app/shared/functions/calculate-total-price.function';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonLabel,
    IonItem,
    IonList,
    IonSpinner,
    IonCardContent,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class CarDetailsPage implements OnInit {
  loadingToastOptions: ToastOptions = {
    message: 'Saving rental...',
    position: 'top',
    icon: 'hourglass-outline',
  };

  successToastOptions: ToastOptions = {
    message: 'Rental saved successfully!',
    duration: 2000,
    icon: 'checkmark-circle-outline',
    position: 'top',
    color: 'success',
  };

  errorToastOptions: ToastOptions = {
    message: 'Failed to save the rental. Please try again.',
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

  isLoading = true;
  carId = '';
  car$ = signal<Car>({} as Car);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private authService: AuthService,
    private carService: CarService,
    private rentalService: RentalService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.carId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.carService.getCarById(this.carId).subscribe(car => {
      this.isLoading = false;
      this.car$.set(car);
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/app/cars');
  }

  async openModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: RentalFormComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.save(data);
    }
  }

  async save(data: { startDate: Date; endDate: Date; extras: Extra[] }): Promise<void> {
    this.toastService.presentClosableToast(this.loadingToastOptions);
    const userId = (await firstValueFrom(this.authService.checkAuth())).user?._id;

    if (userId) {
      const rental = this.createRental(userId, data);

      this.rentalService.createRental(rental).subscribe({
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
    } else {
      this.toastService.presentToast(this.errorToastOptions);
    }
  }

  private createRental(
    userId: string,
    data: { startDate: Date; endDate: Date; extras: Extra[] }
  ): Rental {
    const extraIds = data.extras.map(extra => extra._id).filter(id => id !== undefined);
    const totalPrice = calculateTotalPrice(
      this.car$().dailyPrice,
      data.startDate,
      data.endDate,
      data.extras
    );

    return {
      userId: userId,
      carId: this.carId,
      extras: extraIds,
      startDate: data.startDate,
      endDate: data.endDate,
      totalPrice: totalPrice,
    };
  }
}
