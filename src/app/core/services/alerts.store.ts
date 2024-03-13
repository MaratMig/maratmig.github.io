import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  interval,
  throwError,
} from 'rxjs';
import {
  catchError,
  map,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Alert } from 'src/app/models/alert';
import { LocalStorageService } from './local-storage.service';
import { Categories } from 'src/app/models/categories';
import mock from '../../mock/MOCK_DATA.json';

@Injectable({
  providedIn: 'root',
})
export class AlertsStore {
  baseUrl = 'http://localhost:3000/api';
  readonly DISMISSED_ALERTS = 'dismissedAlerts';
  private unsubscribe$ = new Subject<void>();

  private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<
    Alert[]
  >([]);

  alerts$: Observable<Alert[]> = this.alertsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.loadAlerts();
    this.startPolling();
  }

  private loadAlerts(): void {
    const activeAlerts$ = this.http.get<Alert[]>(`${this.baseUrl}/alerts`).pipe(
      tap((alerts) => this.alertsSubject.next(alerts)),
      catchError((err) => {
        const message = 'Could not load alerts';
        console.log(message, err);
        return throwError(() => new Error(message));
      })
    );

    const dismissedAlerts$ = this.localStorage.loadData(this.DISMISSED_ALERTS);
    this.combineActiveAndDismissed(activeAlerts$, dismissedAlerts$);
  }

  private startPolling() {
    interval(10000)
      .pipe(
        takeUntil(this.unsubscribe$),
        map(() => {
          this.loadAlerts();
        })
      )
      .subscribe((alerts) => console.log('ALERTS'));
  }

  combineActiveAndDismissed(
    activeAlerts$: Observable<Alert[]>,
    dismissedAlerts$: Observable<Alert[]>
  ) {
    combineLatest([activeAlerts$, dismissedAlerts$])
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe(([active, dismissed]) => {
        const alerts = active.concat(dismissed);
        console.log('alerts ', alerts);
        this.alertsSubject.next(alerts);
      });
  }

  dismissAlert(alert: Alert) {
    console.log('dismissedAlert');
    const alerts = this.alertsSubject.getValue();
    const index = this.findIndexById(alert.id, alerts);
    const dismissedAlert = this.createDismissedAlert(alerts[index]);
    const newAlerts = this.createNewAlers(alerts, dismissedAlert, index);

    this.updateLocalStorage(dismissedAlert);
    this.sendAlertDismissRequest(dismissedAlert, newAlerts);
  }

  private findIndexById(alertId: string, alerts: Alert[]): number {
    return alerts.findIndex((alert) => alert.id === alertId);
  }

  private createDismissedAlert(originalAlert: Alert): Alert {
    return { ...originalAlert, active: false };
  }

  private createNewAlers(
    alerts: Alert[],
    newAlert: Alert,
    index: number
  ): Alert[] {
    const newAlerts: Alert[] = alerts.slice(0);
    newAlerts[index] = newAlert;

    return newAlerts;
  }

  sendAlertDismissRequest(newAlert: Alert, newAlerts: Alert[]) {
    this.http
      .put<Alert>(`${this.baseUrl}/alerts/${newAlert.id}`, newAlert)
      .pipe(
        take(1),
        takeUntil(this.unsubscribe$),
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

  updateLocalStorage(newAlert: Alert) {
    this.localStorage
      .loadData(this.DISMISSED_ALERTS)
      .pipe(take(1), takeUntil(this.unsubscribe$))
      .subscribe((dismissesAlerts) => {
        dismissesAlerts.push(newAlert);
        this.localStorage.saveData(this.DISMISSED_ALERTS, dismissesAlerts);
      });
  }

  filterByActivity(active: boolean): Observable<Alert[]> {
    return this.alerts$.pipe(
      map((alerts) => alerts.filter((alert) => alert.active == active))
    );
  }

  sortByCategory(category: string) {
    switch (category) {
      case Categories.SeverityAsc:
        this.sortNumeric('severity', 'Asc');
        break;
      case Categories.SeverityDesc:
        this.sortNumeric('severity', 'Desc');
        break;
      case Categories.name:
        this.sortText('name');
        break;
      case Categories.source:
        this.sortText('source');
        break;
      case Categories.dateDesc:
        this.sortNumeric('date', 'Desc');
        break;
      case Categories.dateAsc:
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
        takeUntil(this.unsubscribe$),
        map((alerts) => {
          return sortDirection === 'Asc'
            ? alerts.sort((a, b) => a[category] - b[category])
            : alerts.sort((a, b) => b[category] - a[category]);
        })
      )
      .subscribe((alerts) => {
        this.alertsSubject.next(alerts);
      });
  }

  sortText(category: keyof Pick<Alert, 'name' | 'source'>) {
    this.alerts$
      .pipe(
        take(1),
        takeUntil(this.unsubscribe$),
        map((alerts) =>
          alerts.sort((a, b) => a[category].localeCompare(b[category]))
        )
      )
      .subscribe((alerts) => {
        this.alertsSubject.next(alerts);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
