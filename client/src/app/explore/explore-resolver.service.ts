import { Injectable } from '@angular/core';
import { CarService } from '../core/services/car.service';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Car } from '../core/models/car.model';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExploreResolverService implements Resolve<Car[]>{

  constructor(private carService: CarService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Car[]> | Observable<never> {

    return this.carService.getAll().pipe(take(1),mergeMap(cars => {
      if(cars) {
        return of(cars);
      } else {
        return EMPTY;
      }
    }))
  }
}
