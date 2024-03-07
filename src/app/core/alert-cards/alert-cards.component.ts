import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-alert-cards',
  templateUrl: './alert-cards.component.html',
  styleUrls: ['./alert-cards.component.scss'],
})
export class AlertCardsComponent implements OnInit {
  @Input()
  alerts: Alert[] | null = [];

  @Output()
  alertDismissed = new EventEmitter<Alert>();

  constructor() {}

  ngOnInit(): void {}

  getColorClass(severity: number): string {
    switch (severity) {
      case 1:
        return 'strong-green';
        break;
      case 2:
        return 'green';
        break;
      case 3:
        return 'light-green';
        break;
      case 4:
        return 'light-yellow';
        break;
      case 5:
        return 'yellow';
        break;
      case 6:
        return 'strong-yellow';
        break;
      case 7:
        return 'orange';
        break;
      case 8:
        return 'strong-orange';
        break;
      case 9:
        return 'red';
        break;
      case 10:
        return 'strong-red';
        break;
      default:
        return 'grey';
    }
  }
}
