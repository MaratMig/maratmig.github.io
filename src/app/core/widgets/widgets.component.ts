import { Component, Input, OnInit } from '@angular/core';
import {
  faExclamationCircle,
  faSearchLocation,
  faShoppingBag,
  faBolt,
  faMoneyBill,
  faAddressBook,
  faHands,
} from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'src/app/models/alert';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
})
export class WidgetsComponent implements OnInit {
  @Input()
  alerts: Alert[] | null = [];
  faSearchLocation = faSearchLocation;
  faShoppingBag = faShoppingBag;
  faBolt = faBolt;
  faMoneyBill = faMoneyBill;
  faAddressBook = faAddressBook;
  faHands = faHands;

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
