import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../core/services/rest.service';
import {Esito, RigheEsitiEntity} from '../../../../core/models/rest/rest-interface';

@Component({
  selector: 'app-esiti',
  templateUrl: './esiti.component.html',
  styleUrls: ['./esiti.component.scss']
})
export class EsitiComponent implements OnInit {

  esiti: Esito;
  rowEsiti: RigheEsitiEntity[] = [];
  displayedColumns: string[] = ['dataProva', 'provaTipo', 'sessione', 'provaEsito', 'punteggio', 'linkAllegati'];


  constructor(private rest: RestService) {
    this.rest.getEsitiDinamici().subscribe(
      (x: Esito) => {
        this.esiti = x;
        this.rowEsiti = [];
        this.rowEsiti = this.rowEsiti.concat(x.righeEsiti);
      }
    );
  }

  ngOnInit() {
  }

}


