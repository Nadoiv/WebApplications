import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelManageRoutingModule } from './model-manage-routing.module';
import { ModelManageComponent } from './model-manage.component';
import { MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatTooltipModule, MatToolbarModule, MatOptionModule, MatSelectModule, MatInputModule, MatDialogModule, MatSliderModule, MatSlideToggleModule } from '@angular/material';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModelManageComponent, FilterBarComponent, EditComponent],
  imports: [
    CommonModule,
    ModelManageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  entryComponents: [EditComponent]
})
export class ModelManageModule { }
