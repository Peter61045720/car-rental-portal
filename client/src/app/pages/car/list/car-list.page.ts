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
} from '@ionic/angular/standalone';
import { CarService } from 'src/app/shared/services/car.service';
import { Car } from 'src/app/shared/models/car';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
  standalone: true,
  imports: [
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
  cars$ = signal<Car[]>([]);

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getAllCars().subscribe(cars => {
      this.cars$.set(cars);
    });
  }
}
