import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-alert-cards',
  templateUrl: './alert-cards.component.html',
  styleUrls: ['./alert-cards.component.scss'],
  //add on push
})
export class AlertCardsComponent {
  @Input()
  alerts: Alert[] | null = [];

  @Output()
  alertDismissed = new EventEmitter<Alert>();

  //add enum
  getColorClass(severity: number): string {
    switch (severity) {
      case 1:
        return 'strong-green';
      case 2:
        return 'green';
      case 3:
        return 'light-green';
      case 4:
        return 'light-yellow';
      case 5:
        return 'yellow';
      case 6:
        return 'strong-yellow';
      case 7:
        return 'orange';
      case 8:
        return 'strong-orange';
      case 9:
        return 'red';
      case 10:
        return 'strong-red';
      default:
        return 'grey';
    }
  }
}
