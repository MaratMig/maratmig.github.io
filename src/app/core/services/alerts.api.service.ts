import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Alert } from 'src/app/models/alert';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsApiService {
  baseUrl = 'http://localhost:3000';
  readonly CACHE_SIZE = 1;

  constructor(private http: HttpClient) { }

  fetchAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.baseUrl}/alerts`).pipe(
      shareReplay(this.CACHE_SIZE)
    );
  }
}
