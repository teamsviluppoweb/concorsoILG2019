import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomandaService} from '../../../core/services/domanda.service';
import { DomandaObj} from '../../../core/models';
import {SidenavContainer, SidenavService} from '../../../core/services/sidenav.service';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {

  domanda: DomandaObj;

  dataInvio;
  dataModifica;
  stato;

  constructor(private domandaService: DomandaService, private sidenavService: SidenavService) {
    this.domanda = this.domandaService.domandaobj;
    this.dataInvio = this.domanda.domanda.dataInvio;
    this.dataModifica = this.domanda.domanda.dataModifica;
    this.stato = this.domanda.operazione;

    this.sidenavService.getContainer().subscribe(
      (x: SidenavContainer) => {
        this.dataInvio = x.dataInvio;
        this.dataModifica = x.ultimaModifica;
        this.stato = x.stato;
      }
    );

  }

  ngOnInit() {
  }




}
