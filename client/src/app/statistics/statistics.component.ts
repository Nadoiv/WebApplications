import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../core/services/statistics.service';
import { WsService } from '../core/services/ws.service';
import { count } from 'rxjs/operators';
import { Statistics } from '../core/models/statistics.model';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
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
export class StatisticsComponent implements OnInit {

  hitCount: number
  lastClient: any
  numberOfConnectedClients: Number
  statisticsData: Statistics
  selectedGroup: any
  groupObsv: Subject<any> = new Subject();

  constructor(private statisticService: StatisticsService,
    private wsService: WsService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.data.subscribe((data: { statisticsData: Statistics }) => {
      this.statisticsData = data.statisticsData;
      this.selectedGroup = data.statisticsData.groupBy[0]
    })

    this.wsService.notifyNumberOfConnectedClientsChanged().subscribe(
      count => {
        if (count > this.statisticsData.numberOfConnectedClients) {
          this.statisticsData.hitCount++;
        }
        this.statisticsData.numberOfConnectedClients = count
      },
      err => {
        console.error(err);
      }
    )
  }

}
