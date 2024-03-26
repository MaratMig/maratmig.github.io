import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() actionClicked = new EventEmitter<void>();
  isLoggedIn: boolean;

  constructor() {this.isLoggedIn = true; }

  ngOnInit(): void {
  }

  onButtonClick(): void {
    this.actionClicked.emit();
  }

}
