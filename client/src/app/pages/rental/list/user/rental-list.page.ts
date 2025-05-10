import { CarService } from './../../../../shared/services/car.service';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSpinner,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonNote,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { Rental } from 'src/app/shared/models/rental';
import { RentalService } from 'src/app/shared/services/rental.service';
import { Car } from 'src/app/shared/models/car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.page.html',
  styleUrls: ['./rental-list.page.scss'],
  standalone: true,
  imports: [
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
  rentals = signal<Rental[]>([]);
  cars = signal<Car[]>([]);
  isLoading = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private CarService: CarService,
    private rentalService: RentalService
  ) {}

  ngOnInit() {
    this.fetchRentals();
  }

  async fetchRentals(): Promise<void> {
    const userId = (await firstValueFrom(this.authService.checkAuth())).user?._id;

    if (userId) {
      this.rentalService.getRentalsByUserId(userId).subscribe(rentals => {
        this.rentals.set(rentals);
        this.fetchCars();
      });
    }
  }

  fetchCars(): void {
    this.rentals()
      .map(rental => rental.carId)
      .forEach(carId => {
        this.CarService.getCarById(carId).subscribe({
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

  getCarById(carId: string): Car | undefined {
    return this.cars().find(car => car._id === carId);
  }

  viewRental(id?: string): void {
    this.router.navigateByUrl(`/app/rental/${id}`);
  }
}
