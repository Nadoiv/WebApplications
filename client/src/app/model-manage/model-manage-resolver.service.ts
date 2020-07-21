import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Type } from '../core/models/type.model';
import { ModelService } from '../core/services/model.service';
import { Observable, EMPTY, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalManageResolverService implements Resolve<Type[]> {

  constructor(private modelService: ModelService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Type[]> | Observable<never> {
    return this.modelService.getAll().pipe(take(1), mergeMap(types => {
      if (types) {
        return of(types)
      } else {
        return EMPTY;
      }
    }))
  }
}
