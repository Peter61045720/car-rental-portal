import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:5000/api/auth';

  constructor(private httpClient: HttpClient) {}

  register(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}/register`, user, {
      responseType: 'text',
      withCredentials: true,
    });
  }

  login(email: string, password: string): Observable<string> {
    return this.httpClient.post(
      `${this.url}/login`,
      { email, password },
      { responseType: 'text', withCredentials: true }
    );
  }

  logout(): Observable<string> {
    return this.httpClient.post(
      `${this.url}/logout`,
      {},
      { responseType: 'text', withCredentials: true }
    );
  }

  checkAuth(): Observable<{ loggedIn: boolean; user?: Partial<User> }> {
    return this.httpClient.get<{ loggedIn: boolean; user?: Partial<User> }>(
      `${this.url}/check-auth`,
      {
        withCredentials: true,
      }
    );
  }
}
