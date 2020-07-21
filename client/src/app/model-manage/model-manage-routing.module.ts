import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelManageComponent } from './model-manage.component';
import { ModalManageResolverService } from './model-manage-resolver.service';


const routes: Routes = [
  {
    path: 'model-manage',
    component: ModelManageComponent,
    resolve: {
      types: ModalManageResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelManageRoutingModule { }
