import { Component, OnInit } from '@angular/core';
import {DomandaService} from '../../../../core/services/domanda.service';

@Component({
  selector: 'app-pagina-intermedia',
  templateUrl: './pagina-intermedia.component.html',
  styleUrls: ['./pagina-intermedia.component.scss']
})
export class PaginaIntermediaComponent implements OnInit {

  constructor(private domandaService: DomandaService) { }

  ngOnInit() {
  }

  displayModificaDomanda() {
    return this.domandaService.domandaobj.operazione !== 2;
  }
}
