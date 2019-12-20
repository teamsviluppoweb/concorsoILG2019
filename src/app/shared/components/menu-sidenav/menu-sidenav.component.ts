import {Component} from '@angular/core';
import {DomandaService} from '../../../core/services/domanda.service';
import { DomandaObj} from '../../../core/models';
import {SidenavDati, SidenavService} from '../../../core/services/sidenav.service';
import {globalRoutes} from '../../routes/global-routes';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent  {
  siteRoutes = globalRoutes;

  dataPrimoInvio;
  dataUltimaModifica;
  stato;

  constructor(private domandaService: DomandaService, private sidenavService: SidenavService) {

    this.dataPrimoInvio = this.domandaService.domandaobj.domanda.dataInvio;
    this.dataUltimaModifica = this.domandaService.domandaobj.domanda.dataModifica;
    this.stato = this.domandaService.domandaobj.operazione;

    this.sidenavService.getContainer().subscribe(
      (x: SidenavDati) => {
        this.dataPrimoInvio = x.dataPrimoInvio;
        this.dataUltimaModifica = x.dataUltimaModifica;
        this.stato = x.stato;
      }
    );
  }


  get domanda(): DomandaObj {
    return this.domandaService.domandaobj;
  }

}
