import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Statistics } from '../models/statistics.model';
import { map } from 'rxjs/operators';

@Injectable()
export class StatisticsService {
  constructor(private apiService: ApiService) { }

  getHitCount(): Observable<any> {
    return this.apiService.get('/api/statistics/hitCount');
  }

  getLastClient(): Observable<any> {
    return this.apiService.get('/api/statistics/lastClient');
  }

  getNumberOfConnectedClients(): Observable<any> {
    return this.apiService.get('/api/statistics/connectedClients');
  }
  queryCountMinSketch(key): Observable<any> {
    return this.apiService.post('/api/statistics/cms/', { key: key })
  }

  getStatisticsData(): Observable<Statistics> {
    return this.apiService.get('/api/statistics/').pipe(map(data => {
      data.groupBy.forEach(group => {
        group.data.forEach(it => {
          it.count = it.count || it.value
        });
        if (group.field === "Model") {
          group.data.forEach(it => {
            it._id = it.type[0].Automobile
          })

        }
      })
      return data;
    }));
  }
}