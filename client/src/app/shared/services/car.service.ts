import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private url = 'http://localhost:5000/api/cars';

  constructor(private httpClient: HttpClient) {}

  getAllCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(this.url);
  }

  getCarById(id: string): Observable<Car> {
    return this.httpClient.get<Car>(`${this.url}/${id}`);
  }

  createCar(car: Car): Observable<string> {
    return this.httpClient.post(this.url, car, { responseType: 'text' });
  }

  updateCar(id: string, car: Car): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, car, { responseType: 'text' });
  }

  deleteCar(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
