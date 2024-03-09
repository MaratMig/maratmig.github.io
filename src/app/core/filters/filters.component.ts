import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() filter = new EventEmitter<string>()
  @Output() clearDismissed = new EventEmitter()
  constructor() {}

  ngOnInit(): void {}

}
