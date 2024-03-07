import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { Alert } from 'src/app/models/alert';

import mock from '../../mock/MOCK_DATA.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlertsStore {
  baseUrl = 'http://localhost:3000/api';

  private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<
    Alert[]
  >([]);

  alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAlerts();
  }

  private loadAlerts(): void {
    // return this.alerts$;
    this.alerts$ = this.http.get<Alert[]>(`${this.baseUrl}/alerts`).pipe(
      tap(alerts => this.alertsSubject.next(alerts)),
      catchError((err) => {
        const message = 'Could not load alerts';
        console.log(message, err);
        return throwError(() => new Error(message));
      }),

    );
  }

  dismissAlert(dismissedAlert: Alert) {
    console.log('dismissedAlert');
    const alerts = this.alertsSubject.getValue();
    const index = alerts.findIndex((alert) => alert.id === dismissedAlert.id);
    const newAlert: Alert = {
      ...alerts[index],
      active: false,
    };
    const newAlerts: Alert[] = alerts.slice(0);
    newAlerts[index] = newAlert;
    this.alertsSubject.next(newAlerts);

    // return this.http
    //   .put<Alert[]>(`${this.baseUrl}/alerts/${newAlert.id}`, newAlert)
    //   .pipe(
    //     catchError((err) => {
    //       const message = 'Could not save alert';
    //       console.log(message, err);
    //       return throwError(() => new Error(message));
    //     }),
    //     tap((alerts) => this.alertsSubject.next(alerts))
    //   );
  }

  filterByActivity(active: boolean): Observable<Alert[]> {
    return this.alerts$.pipe(
      map((alerts) =>
        alerts
          .filter((alert) => alert.active == active)
      )
    );
  }

  sortByCategory(category: string) {
    switch (category) {
      case 'severityAsc':
        this.sortNumeric('severity', 'Asc');
        break;
      case 'severityDesc':
        this.sortNumeric('severity', 'Desc');
        break;
      case 'name':
        this.sortText('name');
        break;
      case 'source':
        this.sortText('source');
        break;
      case 'dateDesc':
        this.sortNumeric('date', 'Desc');
        break;
      case 'dateAsc':
        this.sortNumeric('date', 'Asc');
        break;
    }
  }

  sortNumeric(
    category: keyof Pick<Alert, 'severity' | 'date'>,
    sortDirection: string
  ) {
    this.alerts$
      .pipe(
        take(1),
        map((alerts) => {
          return sortDirection === 'Asc'
            ? alerts.sort((a, b) => a[category] - b[category])
            : alerts.sort((a, b) => b[category] - a[category]);
        })
      )
      // NOTE : add unsubscribe
      .subscribe((alerts) => {
        this.alertsSubject.next(alerts);
      });
  }

  sortText(category: keyof Pick<Alert, 'name' | 'source'>) {
    this.alerts$
      .pipe(
        take(1),
        map((alerts) =>
          alerts.sort((a, b) => a[category].localeCompare(b[category]))
        )
      )
      // NOTE : add unsubscribe
      .subscribe((alerts) => {
        this.alertsSubject.next(alerts);
      });
  }

}
