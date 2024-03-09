import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  of,
  throwError,
} from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Alert } from 'src/app/models/alert';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AlertsStore {
  baseUrl = 'http://localhost:3000/api';
  readonly DISMISSED_ALERTS = 'dismissedAlerts';

  private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<
    Alert[]
  >([]);

  alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.loadAlerts();
  }

  private loadAlerts(): void {
    // NOTE: ADD POLLING !!!!
    const activeAlerts$ = this.http.get<Alert[]>(`${this.baseUrl}/alerts`).pipe(
      tap((alerts) => this.alertsSubject.next(alerts)),
      catchError((err) => {
        const message = 'Could not load alerts';
        console.log(message, err);
        return throwError(() => new Error(message));
      })
    );
    const dismissedAlerts$ = this.localStorage.loadData(this.DISMISSED_ALERTS);

    combineLatest([activeAlerts$, dismissedAlerts$])
      .pipe(take(1))
      .subscribe(([active, dismissed]) => {
        const alerts = active.concat(dismissed);
        // console.log('alerts ', alerts);
        this.alertsSubject.next(alerts);
      });
  }

  dismissAlert(dismissedAlert: Alert) {
    console.log('dismissedAlert');
    const alerts = this.alertsSubject.getValue();
    // console.log('newAlerts ', alerts);
    const index = alerts.findIndex((alert) => alert.id === dismissedAlert.id);
    const newAlert: Alert = {
      ...alerts[index],
      active: false,
    };
    const newAlerts: Alert[] = alerts.slice(0);
    newAlerts[index] = newAlert;
    // console.log('newAlerts ', newAlerts);
    this.alerts$ = of(newAlerts);
    this.alertsSubject.next(newAlerts);
    this.localStorage
      .loadData(this.DISMISSED_ALERTS)
      .pipe(take(1))
      .subscribe((dismissesAlerts) => {
        dismissesAlerts.push(newAlert);
        this.localStorage.saveData(this.DISMISSED_ALERTS, dismissesAlerts);
      });

    return this.http
      .put<Alert>(`${this.baseUrl}/alerts/${newAlert.id}`, newAlert)
      .pipe(
        take(1),
        catchError((err) => {
          const message = 'Could not save alert';
          console.log(message, err);
          return throwError(() => new Error(message));
        })
      )
      .subscribe((msg) => {
        this.alertsSubject.next(newAlerts);
        console.log('Updated successfuly: ', msg);
      });
  }

  filterByActivity(active: boolean): Observable<Alert[]> {
    return this.alerts$.pipe(
      map((alerts) => alerts.filter((alert) => alert.active == active))
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

  clearDismissed() {
    this.localStorage
    .deleteData(this.DISMISSED_ALERTS)
    this.loadAlerts()
  }
}
