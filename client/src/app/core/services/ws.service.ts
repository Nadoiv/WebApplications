import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';


@Injectable()

export class WsService {
  socket$: WebSocketSubject<any>
  constructor() {
    this.socket$ = webSocket("ws://localhost:3001")

  }

  notifyCarRemoved(): Observable<Car> {
    return new Observable(subscriber => {
      this.socket$.subscribe(
        msg => {
          if (msg.action === "carRemoved") {
            subscriber.next(msg.data)
          }
        }
      )
    })
  }

  notifyCarAdded(): Observable<Car> {
    return new Observable(subscriber => {
      this.socket$.subscribe(
        msg => {
          if (msg.action === "carAdded") {
            subscriber.next(msg.data)
          }
        }
      )
    })
  }

  notifyCarUpdated(): Observable<Car> {
    return new Observable(subscriber => {
      this.socket$.subscribe(
        msg => {
          if (msg.action === "carUpdated") {
            subscriber.next(msg.data)
          }
        }
      )
    })
  }

  notifyNumberOfConnectedClientsChanged(): Observable<number> {
    return new Observable(subscriber=> {
      this.socket$.subscribe(
        msg=> {
          if (msg.action === "NumberOfConnectedClientsChanged") {
            subscriber.next(msg.data);
          }
        }
      )
    })
  }

}