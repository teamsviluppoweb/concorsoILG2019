import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthService} from '../services';
import {catchError, first, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  env = environment;
  private url: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.url = window.location.href;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    const myRegexp = new RegExp('[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$');
    console.log('staaart');
    if (myRegexp.test(this.url)) {
      const deleteme = 'http://172.16.26.72:4200/?ticket=JWT-';
      this.url = this.url.replace(deleteme, '');

      const j = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkZW1vIiwiaWF0IjoxNTU4NjAzOTk2LCJleHAiOjE1NTg2MDY5OTZ9.zzOhkSr1ZcP6o0aSRNLzjqT5daGIwDcfWlXDGvj_PtQ';
      localStorage.setItem('tempJWT', this.url);
      // CHECK JWT IN URL

      return this.http.get('http://localhost:8080/whoami').pipe(
        map((x) => {
          if (x) {
            return true;
          }
        }),
        catchError((err) => {
          console.log(err);
          if (err.status === 200) {
            console.log(err);
            console.log('TEMP VALIDO');
            localStorage.removeItem('temp' +
              'JWT');
            localStorage.setItem('jwtToken', this.url );
            return of(true);
          } else {
            this.router.navigate(['/out']);
            return of(false);
            // this.authService.logout();
          }
        }),
        first()
      );

    } else {
      console.log('REGEX INVALIDA');
      // CHECK LOCAL JWT
      return this.http.get('http://localhost:8080/whoami').pipe(
        map((x) => {
          if (x) {
            return true;
          }
        }),
        catchError((err) => {
          if (err.status === 200) {
            return of(true);
          }
          if (err.status === 401) {
            this.router.navigate(['/out']);
            return of(false);
          }
          this.router.navigate(['/out']);
          return of(false);
        }),
        first()
      );
    }

  }

}
