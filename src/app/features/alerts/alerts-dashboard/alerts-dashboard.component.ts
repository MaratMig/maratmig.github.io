import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Alert } from 'src/app/models/alert';
import { AlertsStore } from '../services/alerts.store';

@Component({
  selector: 'app-alerts-dashboard',
  templateUrl: './alerts-dashboard.component.html',
  styleUrls: ['./alerts-dashboard.component.scss'],
})
export class AlertsDashboardComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  alerts$: Observable<Alert[]>;
  activeAlerts$: Observable<Alert[]>;
  dismissedAlerts$: Observable<Alert[]>;
  constructor(private alertsStore: AlertsStore) {}
  ngOnInit(): void {
    this.getAlerts();
  }

  getAlerts() {
    this.alertsStore
      .loadAlerts()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((alerts) => {
          this.activeAlerts$ = this.alertsStore.getActiveAlerts();
          this.dismissedAlerts$ = this.alertsStore.getDismissedAlerts();
        })
      )
      .subscribe(() => {
        console.log('Alerts Loaded');
      });
  }

  sortBy(category: string) {
    console.log('category :  ', category);
    this.alertsStore.sortByCategory(category);
  }

  dismissAlert(alert: Alert) {
    this.alertsStore.dismissAlert(alert);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
