import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/core/models/filter.model';
import { Type } from 'src/app/core/models/type.model';
import { ModelService } from 'src/app/core/services/model.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  filter: Filter;
  types: Type[];
  @Output() filterRequest = new EventEmitter<Filter>();
  @Input() mapView: boolean;
  
  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this.filter = {
      hands: [],
      manufactured: 1950,
      types: []
    }

    this.modelService.getAll().subscribe((data: Type[]) => {
      this.types = data;
    })
  }

  emitFilterRequest() {
    this.filterRequest.emit(this.filter);
  }
}
