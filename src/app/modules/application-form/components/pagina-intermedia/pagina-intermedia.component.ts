import { Component, OnInit } from '@angular/core';
import {DomandaService} from '../../../../core/services/domanda.service';
import {DomandaObj} from '../../../../core/models';
import {RestService} from '../../../../core/services/rest.service';

@Component({
  selector: 'app-pagina-intermedia',
  templateUrl: './pagina-intermedia.component.html',
  styleUrls: ['./pagina-intermedia.component.scss']
})
export class PaginaIntermediaComponent implements OnInit {

  domanda: DomandaObj;

  constructor(private domandaService: DomandaService, private restData: RestService) {
    this.domanda = this.domandaService.domandaobj;
  }

  ngOnInit() {
  }

  displayModificaDomanda() {
    return this.domandaService.domandaobj.operazione !== 2;
  }
}
