import { Component, OnInit } from '@angular/core';
import {
  faExclamationCircle,
  faSearchLocation,
  faShoppingBag,
  faBolt,
  faMoneyBill,
  faAddressBook,
  faHands,
  faHome,
  faChartBar,
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  faExclamationCircle = faExclamationCircle;
  faSearchLocation = faSearchLocation;
  faShoppingBag = faShoppingBag;
  faBolt = faBolt;
  faMoneyBill = faMoneyBill;
  faAddressBook = faAddressBook;
  faHands = faHands;
  faHome = faHome;
  faChartBar = faChartBar;
  faUser = faUser;

  constructor() {}

  ngOnInit(): void {}
}