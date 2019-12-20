import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../../core/services';
import {DomandaObj} from '../../core/models';
import {DomandaService} from '../../core/services/domanda.service';


@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent {

  @ViewChild('drawer', { static: true }) topbarDrawer: MatDrawer;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private domandaService: DomandaService) {
  }

   closeDialog() {
    this.topbarDrawer.toggle();
  }


  logout() {
    this.auth.logout();
  }

  get domanda(): DomandaObj {
    return this.domandaService.domandaobj;
  }
}
