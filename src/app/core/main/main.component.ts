import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert';
import { Observable, tap } from 'rxjs';
import { AlertsStore } from '../services/alerts.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  activeAlerts$: Observable<Alert[]>;
  dismissedAlerts$: Observable<Alert[]>;

  constructor(private alertsStore: AlertsStore) {}

  ngOnInit(): void {
    this.getAlerts();
  }

  getAlerts() {
    this.activeAlerts$ = this.alertsStore.filterByActivity(true);
    this.dismissedAlerts$ = this.alertsStore
      .filterByActivity(false)
      .pipe(tap((al) => console.log('al', al)));
  }

  sortBy(category: string) {
    console.log('category :  ', category);
    this.alertsStore.sortByCategory(category);
    this.getAlerts();
  }

  dismissAlert(alert: Alert) {
    this.alertsStore.dismissAlert(alert);
    this.getAlerts();
  }

  clearDismissed() {
    this.alertsStore.clearDismissed();
    this.getAlerts();
  }
}
