import { Component, OnInit } from '@angular/core';
import {DomandaService} from '../../../core/services/domanda.service';
import { DomandaObj} from '../../../core/models';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {

  domanda: DomandaObj;
  constructor(private domandaService: DomandaService) {
    this.domanda = this.domandaService.domandaobj;
  }

  ngOnInit() {
  }

}
