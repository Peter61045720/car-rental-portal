import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Extra } from '../models/extra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExtraService {
  private url = 'http://localhost:5000/api/extras';

  constructor(private httpClient: HttpClient) {}

  getAllExtras(): Observable<Extra[]> {
    return this.httpClient.get<Extra[]>(this.url);
  }

  getExtraById(id: string): Observable<Extra> {
    return this.httpClient.get<Extra>(`${this.url}/${id}`);
  }

  createExtra(extra: Extra): Observable<string> {
    return this.httpClient.post(this.url, extra, { responseType: 'text' });
  }

  updateExtra(id: string, extra: Extra): Observable<string> {
    return this.httpClient.put(`${this.url}/${id}`, extra, { responseType: 'text' });
  }

  deleteExtra(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
