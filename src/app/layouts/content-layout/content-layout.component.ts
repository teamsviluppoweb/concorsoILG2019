import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {SessionCheckServiceService} from '../../core/services/session-check-service.service';
import {AuthService} from '../../core/services';


@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnDestroy {

  tokenValidity$: Subscription;

  @ViewChild('drawer', { static: true }) topbarDrawer: MatDrawer;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private tokenSession: SessionCheckServiceService, private auth: AuthService) {
    this.tokenValidity$ = this.tokenSession.checkValidity().subscribe(
      (x) => {
        if (this.tokenSession.helper.isTokenExpired(this.tokenSession.token)) {
          this.tokenSession.openDialog();
          this.tokenValidity$.unsubscribe();
        }
      }
    );

  }


  MenuIconState() {
    if (this.topbarDrawer.opened ) {
      return 'close';
    }
    return 'menu';
  }

  CloseNavBar() {
    this.topbarDrawer.toggle();
  }


  closeDialog() {
    this.topbarDrawer.toggle();
  }

  ngOnDestroy(): void {
    this.tokenValidity$.unsubscribe();
  }


  logout() {
    this.auth.logout();
  }
}
