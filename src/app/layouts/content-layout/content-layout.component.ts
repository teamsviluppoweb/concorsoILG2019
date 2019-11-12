import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent  {

  @ViewChild('drawer', { static: true }) topbarDrawer: MatDrawer;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}


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




}
