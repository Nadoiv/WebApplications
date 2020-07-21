import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatGridListModule, MatDividerModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatChipsModule, MatIconModule, MatSliderModule, MatButtonModule, MatDialogModule, MatInputModule, MatTooltipModule, MatSlideToggleModule } from '@angular/material';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditComponent } from './edit/edit.component'
import { ImageLazyLoadDirective } from '../core/directives/img-lazy-load.directive';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [ExploreComponent, FilterBarComponent, EditComponent, ImageLazyLoadDirective],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule,
    MatSlideToggleModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCgfUTGzlzr4DmsTbCy4OBkxqZ8y7nimxI'
    })
  ],
  providers: [],
  entryComponents: [EditComponent],
  bootstrap: [ExploreComponent]
})
export class ExploreModule { }
