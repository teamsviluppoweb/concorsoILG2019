import { Component, OnInit } from '@angular/core';
import {DomandaService} from '../../../../core/services/domanda.service';
import {DomandaObj} from '../../../../core/models';
import {RestService} from '../../../../core/services/rest.service';
import {InfoConorso} from '../../../../core/models/rest/rest-interface';

@Component({
  selector: 'app-pagina-intermedia',
  templateUrl: './pagina-intermedia.component.html',
  styleUrls: ['./pagina-intermedia.component.scss']
})
export class PaginaIntermediaComponent implements OnInit {

  domanda: DomandaObj;
  infoConcorso: InfoConorso;

  constructor(private domandaService: DomandaService, private restData: RestService) {
    this.domanda = this.domandaService.domandaobj;

    this.restData.getInfoConcorso().subscribe(
      (data: InfoConorso) => {
        this.infoConcorso = data;
      }
    );
  }

  ngOnInit() {
  }

  displayModificaDomanda() {
    return this.domandaService.domandaobj.operazione !== 2;
  }
}
