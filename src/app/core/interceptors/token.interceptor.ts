import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('token');
    const cloned = request.clone({
      headers: request.headers.set('Authorization',
        'Bearer ' + token)
    });


    return next.handle(cloned).pipe(
      tap(
        succ => {
        },
        err => {
          if (err.status === 401) {
            this.router.navigateByUrl('/guest/login');
          }
          if (err.status === 500) {
            console.log(err);
            this.router.navigateByUrl('/guest/error');
          }
        }
      )
    );
  }
}
