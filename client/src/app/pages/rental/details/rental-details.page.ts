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
  rentalId = '';
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
    this.rentalService.getRentalById(this.rentalId).subscribe(rental => {
      this.rental.set(rental);
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
  }

  goBack(): void {
    this.router.navigateByUrl('/app/rentals');
  }

  update(): void {
    this.toastService.presentClosableToast(this.loadingToastOptions);
  }

  delete(): void {
    this.rentalService.deleteRental(this.rentalId).subscribe(() => {
      this.goBack();
    });
  }
}
