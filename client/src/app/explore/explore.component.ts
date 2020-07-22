import { Component, OnInit } from '@angular/core';
import { Car } from '../core/models/car.model';
import { CarService } from '../core/services/car.service';
import { Filter } from '../core/models/filter.model';
import { WsService } from '../core/services/ws.service';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { EditComponent } from './edit/edit.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500)
      ])
    ])
  ]
})
export class ExploreComponent implements OnInit {

  cars: Car[];
  mapView: any = { show: false };
  lat = 32.0852999;
  lng = 34.78176759999999;
  zoom = 11;
  editDialogWidth = '425px';
  constructor(
    private carService: CarService,
    private wsService: WsService,
    public editDialog: MatDialog,
    private route: ActivatedRoute,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('rent-car',
      sanitizer.bypassSecurityTrustResourceUrl('assets/key.svg'))
  }

  ngOnInit() {
    this.route.data.subscribe((data: { cars: Car[] }) => {
      this.cars = data.cars;
    })

    this.wsService.notifyCarRemoved()
      .subscribe(
        (car) => {
          this.findOneAndRemove(car)
        },
        (err) => console.error(err),
        () => console.warn('Completed!')
      );

    this.wsService.notifyCarAdded()
      .subscribe(
        (car) => {
          this.add(car)
        },
        (err) => console.error(err),
        () => console.warn('Completed!'))

    this.wsService.notifyCarUpdated()
      .subscribe(
        (car) => {
          if (car.isRented === true) {
            this.findOneAndRemove(car)
          } else {
            this.findOneAndUpdate(car)
          }

        },
        (err) => console.error(err),
        () => console.warn('Completed!')
      )
  }

  filter(filter: Filter) {
    this.carService.filter(filter).subscribe((data: Car[]) => {
      this.cars = data;
    })
  }

  remove(car: Car) {
    this.carService.remove(car).subscribe(success => {
      this.findOneAndRemove(car)
    })
  }

  rented(car: Car) {
    this.carService.rented(car).subscribe(sucess => {
      this.findOneAndRemove(car)
    })
  }

  add(car: Car) {
    let index = this.cars.map(it => {
      return it._id
    }).indexOf(car._id);

    if (index === -1) {
      this.cars.push(car);
    }
  }

  findOneAndRemove(car: Car) {
    let index = this.cars.map(it => {
      return it._id
    }).indexOf(car._id);

    if (index !== -1) {
      this.cars.splice(index, 1);
    }
  }

  findOneAndUpdate(car: Car) {
    let index = this.cars.map(it => {
      return it._id
    }).indexOf(car._id);

    if (index !== -1) {
      this.cars[index] = car
    }
  }

  openAddDialog() {
    const dialogRef = this.editDialog.open(EditComponent, {
      width: this.editDialogWidth,
      data: new Car()
    })

    dialogRef.afterClosed().subscribe(newCar => {
      if (newCar) {
        this.carService.add(newCar).subscribe(result => {
          this.add(result);
        })
      }
    })
  }

  openEditDialog(car: Car) {
    const dialogRef = this.editDialog.open(EditComponent, {
      width: this.editDialogWidth,
      data: { ...car }
    })

    dialogRef.afterClosed().subscribe(updatedCar => {
      if (updatedCar) {
        this.carService.update(updatedCar).subscribe(result => {
          this.findOneAndUpdate(result);
        })
      }
    })
  }
}
