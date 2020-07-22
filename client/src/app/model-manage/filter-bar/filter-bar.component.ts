import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  filter: any;
  filterUpdate = new Subject<any>();

  @Output() filterRequest = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    this.filter = {
      type: '',
      production: 1950
    }
  }

  emitFilterRequest() {
    this.filterRequest.emit(this.filter);
  }

}
