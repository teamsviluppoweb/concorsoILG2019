import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {SessionExpiredComponent} from '../../shared/components/session-expired/session-expired.component';

export class SessionCheckServiceService {

  expirationDate;
  helper;
  token;

  constructor(private router: Router, public dialog: MatDialog) {

    this.token = localStorage.getItem('token');
    this.helper = new JwtHelperService();
    this.expirationDate = this.helper.getTokenExpirationDate(this.token);
  }

  public checkValidity(): Observable< any > {
    return interval(1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SessionExpiredComponent, {
      width: '100%',
      height: '100%',
      disableClose: true,
      closeOnNavigation: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      location.reload();
    });
  }


}
