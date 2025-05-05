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
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/shared/services/car.service';
import { Car } from 'src/app/shared/models/car';

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
  formatOptions = {
    date: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  };

  isLoading = false;
  carId = '';
  car$ = signal<Car>({} as Car);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carService: CarService
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
}
