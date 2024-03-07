import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {
  @Input()
  activeAlerts: Alert[] | null = [];
  @Input()
  dismissedAlerts: Alert[] | null = [];
  @Output()
  alertDismissed = new EventEmitter<Alert>();

  constructor() {}

  ngOnInit(): void {}

}
