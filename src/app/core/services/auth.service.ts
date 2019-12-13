import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';
import {DomandaService} from './domanda.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'token';

  constructor( private router: Router, private restApi: DomandaService) { }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeAccessToken(): void {
    localStorage.removeItem('token');
  }

  logout(): void {
    this.removeAccessToken();
    window.location.href = environment.endpoint.pathSpidLogout;
  }

  validateJwt(): Observable<any> {
    return this.restApi.getDomanda().pipe(
      map( (x) => {
        // Se il token è sbagliato ci pensa l'interceptor a fare il logout all'utente
        return true;
      }),
      catchError((err: Response) => {
        return of(false);
      }),
      first()
    );
  }

}
