import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  url: string;

  constructor(private auth: AuthService) {
    this.url = window.location.href;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    switch (this.ispectUrl(this.url)) {

      case true: {
        const token = this.refactorUrl(this.url);
        this.auth.setAccessToken(token);
        return this.auth.validateJwt();
        break;
      }

      case false: {
        return this.auth.validateJwt();
        break;
      }

      default: {
        this.auth.logout();
        return false;
      }

    }


  }


  ispectUrl(url: string): boolean {
    const myRegexp = new RegExp('[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$');

    return myRegexp.test(url);
  }

  refactorUrl(url: string): string {
    let token: string;

    token = url.split('?ticket=').pop();

    return token;
  }


}
