import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Alert } from 'src/app/models/alert';
import { AlertsApiService } from './alerts.api.service';

import * as mock from '../../mock/MOCK_DATA.json'

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  private alerts: Alert[] = [];

  private alertsSubject: BehaviorSubject<Alert[]> = new BehaviorSubject<
    Alert[]
  >(mock);

  alerts$ = this.alertsSubject.asObservable().pipe(
    tap((alerts) => (this.alerts = alerts)),
    filter((res) => !!res && res.length > 0)
  );

  constructor(private alertsApi: AlertsApiService) {}
}
