import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private url = 'http://localhost:5000/api/rentals';

  constructor(private httpClient: HttpClient) {}

  getAllRentals(): Observable<Rental[]> {
    return this.httpClient.get<Rental[]>(this.url);
  }

  getRentalsByUserId(userId: string): Observable<Rental[]> {
    return this.httpClient.get<Rental[]>(`${this.url}/user/${userId}`);
  }

  getRentalById(id: string): Observable<Rental> {
    return this.httpClient.get<Rental>(`${this.url}/${id}`);
  }

  createRental(rental: Rental): Observable<string> {
    return this.httpClient.post(this.url, rental, { responseType: 'text' });
  }

  updateRental(id: string, rental: Rental): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, rental, { responseType: 'text' });
  }

  deleteRental(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
