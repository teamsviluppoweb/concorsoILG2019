import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {catchError, first, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {AuthService} from '../services';
import {DomandaService} from '../services/domanda.service';
import {DomandaObj} from '../models';

@Injectable({
  providedIn: 'root'
})
export class VisualizzaDomandaGuard implements CanActivate {

  constructor(   private router: Router,
                 private authService: AuthService,
                 private domanda: DomandaService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.domanda.getDomanda().pipe(
        map((domanda: DomandaObj) => {
            if (domanda.domanda.stato === 1 || domanda.domanda.stato === 2) {
              return true;
            }
            return false;
          }
        ),
        catchError(
          (err) => {
            return of(false);
          }
        ),
        first()
      );

  }
}
