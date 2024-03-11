import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/models/alert';
import { AlertsStore } from '../services/alerts.store';

@Component({
  selector: 'app-alerts-dashboard',
  templateUrl: './alerts-dashboard.component.html',
  styleUrls: ['./alerts-dashboard.component.scss'],
})
export class AlertsDashboardComponent {
  activeAlerts$: Observable<Alert[]> = this.alertsStore.filterByActivity(true);
  dismissedAlerts$: Observable<Alert[]> =
    this.alertsStore.filterByActivity(false);

  constructor(private alertsStore: AlertsStore) {}

  getAlerts() {
    this.activeAlerts$ = this.alertsStore.filterByActivity(true);
    this.dismissedAlerts$ = this.alertsStore
      .filterByActivity(false)
  }

  sortBy(category: string) {
    console.log('category :  ', category);
    this.alertsStore.sortByCategory(category);
  }

  dismissAlert(alert: Alert) {
    this.alertsStore.dismissAlert(alert);
  }
}
