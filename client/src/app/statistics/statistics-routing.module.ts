import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { StatisticsResolverService } from './statistics-resolver.service';


const routes: Routes = [
  {
    path:'statistics',
    component:StatisticsComponent,
    resolve: {
      statisticsData: StatisticsResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
