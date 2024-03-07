import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../services/alerts.service';
import { Alert } from 'src/app/models/alert';
import { Observable } from 'rxjs';
import { AlertsStore } from '../services/alerts.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  alerts$: Observable<Alert[]>;

  constructor(private alertsStore: AlertsStore) {}

  ngOnInit(): void {
    this.getAlerts();
  }

  getAlerts() {
    this.alerts$ = this.alertsStore.courses$;
  }
}
