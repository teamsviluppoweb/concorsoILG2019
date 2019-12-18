import { Component, OnInit } from '@angular/core';
import {DomandaObj} from '../../../core/models';
import {InfoConorso} from '../../../core/models/rest/rest-interface';
import {DomandaService} from '../../../core/services/domanda.service';
import {RestService} from '../../../core/services/rest.service';
import {SidenavContainer, SidenavService} from '../../../core/services/sidenav.service';


@Component({
  selector: 'app-pagina-intermedia',
  templateUrl: './pagina-intermedia.component.html',
  styleUrls: ['./pagina-intermedia.component.scss']
})
export class PaginaIntermediaComponent implements OnInit {

  domanda: DomandaObj;
  infoConcorso: InfoConorso;
  stato;

  constructor(private domandaService: DomandaService, private restData: RestService,  private sidenavService: SidenavService) {

    this.infoConcorso = {
      dataFineConcorso: '',
      dataFineDomanda: '',
      dataInizioDomanda: '',
      nomeConcorso: '',
      titoloConcorso: '',
    };

    this.domanda = this.domandaService.domandaobj;

    this.restData.getInfoConcorso().subscribe(
      (data: InfoConorso) => {
        this.infoConcorso = data;
      }
    );
  }

  ngOnInit() {
    this.stato = this.domandaService.domandaobj.operazione;
    this.sidenavService.getContainer().subscribe(
      (x: SidenavContainer) => {
        this.stato = x.stato;
      }
    );

  }

}
