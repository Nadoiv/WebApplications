import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Car } from 'src/app/core/models/car.model';
import { CarService } from 'src/app/core/services/car.service';
import { Type } from 'src/app/core/models/type.model';
import { ModelService } from 'src/app/core/services/model.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  car: Car;
  types: Type[];

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private modelService: ModelService,
    @Inject(MAT_DIALOG_DATA) public data: Car
  ) {
    this.car = data;
  }

  ngOnInit() {
    this.modelService.getAll().subscribe((data: Type[]) => {
      this.types = data;
    })
  }

  cancel(): void {
    this.dialogRef.close();
  }

  comparer(o1: any, o2:any) {
    return o1._id === o2._id
  }
}
