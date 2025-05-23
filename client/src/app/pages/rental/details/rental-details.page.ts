import { ToastService } from './../../../shared/services/toast.service';
import { CarService } from './../../../shared/services/car.service';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonCardHeader,
  IonCardTitle,
  IonMenuButton,
  IonIcon,
  IonListHeader,
  IonNote,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  ToastOptions,
  IonAlert,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from 'src/app/shared/models/rental';
import { RentalService } from 'src/app/shared/services/rental.service';
import { Car } from 'src/app/shared/models/car';
import { Extra } from 'src/app/shared/models/extra';
import { ExtraService } from 'src/app/shared/services/extra.service';
import { isBefore, startOfDay } from 'date-fns';
import { calculateTotalPrice } from 'src/app/shared/functions/calculate-total-price.function';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.page.html',
  styleUrls: ['./rental-details.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
    IonDatetime,
    IonModal,
    IonDatetimeButton,
    IonListHeader,
    IonIcon,
    IonCardTitle,
    IonCardHeader,
    IonButton,
    IonLabel,
    IonNote,
    IonItem,
    IonList,
    IonCardContent,
    IonCard,
    IonSpinner,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class RentalDetailsPage implements OnInit {
  public alertButtons = [
    {
      text: 'No, keep it',
      role: 'cancel',
    },
    {
      text: 'Yes, cancel it',
      role: 'confirm',
      handler: () => this.delete(),
    },
  ];

  loadingToastOptions: ToastOptions = {
    message: 'Updating rental...',
    position: 'top',
    icon: 'hourglass-outline',
  };

  successToastOptions: ToastOptions = {
    message: 'Rental updated successfully!',
    duration: 2000,
    icon: 'checkmark-circle-outline',
    position: 'top',
    color: 'success',
  };

  errorToastOptions: ToastOptions = {
    message: 'Failed to update the rental. Please try again.',
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
  isEditing = false;
  isExpired = true;
  rentalId = '';
  startDate = new Date().toISOString();
  endDate = new Date().toISOString();
  rental = signal<Rental>({} as Rental);
  car = signal<Car>({} as Car);
  extras = signal<Extra[]>([]);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private rentalService: RentalService,
    private carService: CarService,
    private extraService: ExtraService
  ) {}

  ngOnInit(): void {
    this.rentalId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.fetchRental();
  }

  fetchRental(): void {
    this.rental.set({} as Rental);
    this.car.set({} as Car);
    this.extras.set([]);

    this.rentalService.getRentalById(this.rentalId).subscribe(rental => {
      this.rental.set(rental);
      this.startDate = new Date(rental.startDate).toISOString();
      this.endDate = new Date(rental.endDate).toISOString();

      const today = startOfDay(new Date());
      const targetDate = startOfDay(new Date(rental.startDate));
      this.isExpired = isBefore(targetDate, today);

      this.fetchData();
    });
  }

  fetchData(): void {
    this.carService.getCarById(this.rental().carId).subscribe(car => {
      this.car.set(car);
    });

    if (this.rental().extras?.length !== 0) {
      this.rental().extras?.forEach(extraId => {
        this.extraService.getExtraById(extraId).subscribe({
          next: extra => {
            this.extras.update(extras => {
              return [...extras, extra];
            });
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      });
    } else {
      this.isLoading = false;
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.startDate = new Date(this.rental().startDate).toISOString();
    this.endDate = new Date(this.rental().endDate).toISOString();
  }

  goBack(): void {
    this.router.navigateByUrl('/app/rentals');
  }

  update(): void {
    this.toastService.presentClosableToast(this.loadingToastOptions);

    this.rental().startDate = new Date(this.startDate);
    this.rental().endDate = new Date(this.endDate);
    this.rental().totalPrice = calculateTotalPrice(
      this.car().dailyPrice,
      this.rental().startDate,
      this.rental().endDate,
      this.extras()
    );

    this.rentalService.updateRental(this.rentalId, this.rental()).subscribe({
      next: () => {
        this.toastService.close();
        this.toastService.presentToast(this.successToastOptions);
        this.isLoading = true;
        this.fetchRental();
      },
      error: () => {
        this.toastService.close();
        this.toastService.presentToast(this.errorToastOptions);
      },
    });
  }

  delete(): void {
    this.rentalService.deleteRental(this.rentalId).subscribe(() => {
      this.goBack();
    });
  }
}
