import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';
import {DomandaService} from './domanda.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'token';

  constructor( private router: Router, private restApi: DomandaService) { }

  getAccessToken(): string {
    return sessionStorage.getItem('token');
  }

  setAccessToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  removeAccessToken(): void {
    sessionStorage.removeItem('token');
  }

  logout(): void {
    const tk = sessionStorage.getItem('token');
    this.removeAccessToken();
    window.location.href = '//sso.vigilfuoco.it/cas-test/logout?service=https://localhost:8080/testjwt/' + tk;
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
