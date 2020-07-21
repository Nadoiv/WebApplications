import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  filter: any;
  filterUpdate = new Subject<any>();

  @Input() origins: string[];
  @Output() filterRequest = new EventEmitter<any>();

  constructor() {
    this.filterUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged()).subscribe(() => {
        this.emitFilterRequest()
      })
  }

  ngOnInit() {
    this.filter = {
      origins: [],
      search: ""
    }
  }

  emitFilterRequest() {
    this.filterRequest.emit(this.filter);
  }

}
