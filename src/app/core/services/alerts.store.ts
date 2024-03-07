import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Alert } from 'src/app/models/alert';
import { AlertsApiService } from './alerts.api.service';

import  mock  from '../../mock/MOCK_DATA.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlertsStore {
  baseUrl = 'http://localhost:3000';

  private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<
    Alert[]
  >(mock);

  courses$: Observable<Alert[]> = this.alertsSubject.asObservable();

  constructor(private http: HttpClient) {
    // this.loadAlerts();
  }

  private loadAlerts() {
    return this.http.get<Alert[]>(`${this.baseUrl}/alerts`).pipe(
      // map(response => response["payload"]),
      catchError((err) => {
        const message = 'Could not load alerts';
        console.log(message, err);
        return throwError(() => new Error(message));
      }),
      tap((courses) => this.alertsSubject.next(courses))
    );
  }
}
