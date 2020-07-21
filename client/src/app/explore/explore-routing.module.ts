import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExploreComponent } from './explore.component';
import { ExploreResolverService } from './explore-resolver.service';


const routes: Routes = [
  {
    path: 'explore',
    component: ExploreComponent,
    resolve: {
      cars: ExploreResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
