import { Component, OnInit, Input, Inject } from '@angular/core';
import { Type } from 'src/app/core/models/type.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  // origins: string[];
  type: Type;

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = data.type;
    // this.origins = data.origins;
  }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
