import { UserService } from './../../../../shared/services/user.service';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonNote,
  IonSpinner,
  IonTitle,
  IonToolbar,
  // IonItemSliding,
  // IonItemOption,
  // IonItemOptions,
  IonIcon,
  ToastOptions,
  IonButton,
} from '@ionic/angular/standalone';
import { RentalService } from 'src/app/shared/services/rental.service';
import { Rental } from 'src/app/shared/models/rental';
import { Car } from 'src/app/shared/models/car';
import { CarService } from 'src/app/shared/services/car.service';
import { User } from 'src/app/shared/models/user';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.page.html',
  styleUrls: ['./rental-list.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    // IonItemOptions,
    // IonItemOption,
    // IonItemSliding,
    IonLabel,
    IonItem,
    IonListHeader,
    IonList,
    IonNote,
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
export class RentalListPage implements OnInit {
  loadingToastOptions: ToastOptions = {
    message: 'Deleting rental...',
    position: 'top',
    icon: 'hourglass-outline',
  };

  successToastOptions: ToastOptions = {
    message: 'Rental deleted successfully!',
    duration: 2000,
    icon: 'checkmark-circle-outline',
    position: 'top',
    color: 'success',
  };

  errorToastOptions: ToastOptions = {
    message: 'Failed to delete the rental. Please try again.',
    duration: 2000,
    icon: 'alert-circle-outline',
    position: 'top',
    color: 'danger',
  };

  rentals = signal<Rental[]>([]);
  users = signal<User[]>([]);
  cars = signal<Car[]>([]);
  isLoading = true;

  constructor(
    private toastService: ToastService,
    private rentalService: RentalService,
    private userService: UserService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.fetchRentals();
  }

  fetchRentals(): void {
    this.rentalService.getAllRentals().subscribe(rentals => {
      this.rentals.set(rentals);
      this.fetchUsers();
      this.fetchCars();
    });
  }

  fetchUsers(): void {
    this.rentals()
      .map(rental => rental.userId)
      .forEach(userId => {
        this.userService.getUserById(userId).subscribe({
          next: user => {
            this.users.update(users => {
              return [...users, user];
            });
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      });
  }

  fetchCars(): void {
    this.rentals()
      .map(rental => rental.carId)
      .forEach(carId => {
        this.carService.getCarById(carId).subscribe({
          next: car => {
            this.cars.update(cars => {
              return [...cars, car];
            });
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      });
  }

  getUserById(userId: string): User | undefined {
    return this.users().find(user => user._id === userId);
  }

  getCarById(carId: string): Car | undefined {
    return this.cars().find(car => car._id === carId);
  }

  delete(id?: string): void {
    this.toastService.presentClosableToast(this.loadingToastOptions);
    if (id) {
      this.rentalService.deleteRental(id).subscribe(() => {
        this.toastService.close();
        this.toastService.presentToast(this.successToastOptions);
        this.fetchRentals();
      });
    }
  }
}
