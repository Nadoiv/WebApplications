import { Component, OnInit, ViewChild } from '@angular/core';
import { Type } from '../core/models/type.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModelService } from '../core/services/model.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-model-manage',
  templateUrl: './model-manage.component.html',
  styleUrls: ['./model-manage.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250)
      ])
    ])
  ]
})
export class ModelManageComponent implements OnInit {

  dataSource: any;
  productions: string[];
  displayedColumns: string[] = ['Model', 'Production', 'Image', 'Actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
    private modelService: ModelService,
    public editDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { types : Type[] }) => {
      this.dataSource = new MatTableDataSource<Type>(data.types);
      this.dataSource.paginator = this.paginator;
      // this.productions = data.type.map(type => type.Production).filter((value, index, self) => self.indexOf(value) === index).sort()
    })

  }

  filter(filter: any) {
    this.modelService.filter(filter).subscribe((data: Type[]) => {
      this.dataSource = new MatTableDataSource<Type>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  remove(type) {
    this.modelService.remove(type).subscribe(success => {
      let index = this.find(type);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      }
    })
  }

  add(type) {
    this.modelService.add(type).subscribe((data: Type) => {
      this.dataSource.data.push(data);
      this.dataSource._updateChangeSubscription();
    })
  }

  update(type) {
    this.modelService.update(type).subscribe((data: Type) => {
      let index = this.find(data)
      if (this.find(data) !== -1) {
        this.dataSource.data[index] = data;
        this.dataSource._updateChangeSubscription();
      }
    })
  }

  find(type) {
    return this.dataSource.data.map(it => {
      return it._id
    }).indexOf(type._id);
  }


  openAddDialog() {
    const dialogRef = this.editDialog.open(EditComponent, {
      width: '300px',
      data: { type: new Type(), Production: this.productions }
    })

    dialogRef.afterClosed().subscribe(newType => {
      if (newType) {
        this.add(newType)
      }
    })
  }

  openEditDialog(type) {
    const dialogRef = this.editDialog.open(EditComponent, {
      width: '300px',
      data: { type: {...type}, origins: this.productions }
    })

    dialogRef.afterClosed().subscribe(updatedType => {
      if (updatedType) {
        this.update(updatedType)
      }
    })
  }

}
