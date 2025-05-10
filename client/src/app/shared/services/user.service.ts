import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:5000/api/users';

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  updateUser(id: string, user: User): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, user, { responseType: 'text' });
  }

  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
