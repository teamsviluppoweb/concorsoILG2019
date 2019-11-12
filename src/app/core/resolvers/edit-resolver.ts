import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve, RouterStateSnapshot,
} from '@angular/router';
import {DomandaService} from '../services/domanda.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EditResolver implements Resolve<any> {
  constructor(private http: DomandaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return this.http.forkJoin();
  }

}
