import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { GraphComponent } from './graph/graph.component';
import { MatGridListModule, MatIconModule, MatTabsModule, MatButtonToggleModule } from '@angular/material';
import { GroupByGraphComponent } from './group-by-graph/group-by-graph.component';


@NgModule({
  declarations: [StatisticsComponent, GraphComponent, GroupByGraphComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    MatGridListModule,
    MatIconModule,
    MatButtonToggleModule
  ]
})
export class StatisticsModule { }
