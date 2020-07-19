import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { CarService } from './services/car.service';
import { ModelService } from './services/model.service';
import { WsService } from './services/ws.service';
import { StatisticsService } from './services/statistics.service';

@NgModule({
  imports:[
    CommonModule
  ],
  providers:[
    ApiService,
    CarService,
    ModelService,
    WsService,
    StatisticsService
  ]
})
export class CoreModule{}