import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
// import { AuthService } from './auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwtToken = localStorage.getItem('jwtToken');
    const tempJWT = localStorage.getItem('tempJWT');

    if (tempJWT) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + tempJWT)
      });
      return next.handle(cloned);
    }
    if (jwtToken && !tempJWT) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + jwtToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }

  }
}
