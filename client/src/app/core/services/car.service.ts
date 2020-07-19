import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { Filter } from '../models/filter.model';
import { map } from 'rxjs/operators';

@Injectable()
export class CarService {
  baseUrl: string
  constructor(
    private apiService: ApiService
  ) {
    this.baseUrl = '/api/car/';
  }

  getAll(): Observable<Car[]> {
    return this.apiService.get('/api/car/');
  }

  filter(filter: Filter): Observable<Car[]> {
    return this.apiService.post(this.baseUrl + '/filter/', filter).pipe(map(cars => {
      cars.forEach(car => {
        car.carAgent = car.carAgent[0]
        car.type = car.type[0]
      })
      return cars
    }));
  }

  remove(car: Car): Observable<any> {
    return this.apiService.delete(this.baseUrl + car._id);
  }

  add(car: Car): Observable<Car> {
    return this.apiService.post(this.baseUrl, car);
  }

  update(car: Car): Observable<Car> {
    return this.apiService.put(this.baseUrl, car);
  }

  rented(car: Car): Observable<Car> {
    return this.apiService.put(this.baseUrl+'rented/', car);
  }
}