import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { StatisticsService } from '../core/services/statistics.service';
import { Statistics } from '../core/models/statistics.model';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsResolverService implements Resolve<any> {

  constructor(private statisticsService: StatisticsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Statistics> | Observable<never> {
    return this.statisticsService.getStatisticsData().pipe(take(1),mergeMap(data => {
      if(data) {
        return of(data);
      } else {
        return EMPTY;
      }
    }))
  }
}
