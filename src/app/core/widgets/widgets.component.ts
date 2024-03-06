import { Component, OnInit } from '@angular/core';
import {
  faExclamationCircle,
  faSearchLocation,
  faShoppingBag,
  faBolt,
  faMoneyBill,
  faAddressBook,
  faHands,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {
  faSearchLocation = faSearchLocation;
  faShoppingBag = faShoppingBag;
  faBolt = faBolt;
  faMoneyBill = faMoneyBill;
  faAddressBook = faAddressBook;
  faHands = faHands;

  constructor() { }

  ngOnInit(): void {
  }

}
