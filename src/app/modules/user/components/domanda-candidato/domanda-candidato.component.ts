import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DomandaDinamica} from '../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../core/services/rest.service';


enum tipoForm {
  input = 0,
  lista = 1,
}

enum grandezzaForm {
  grande = 100,
  medioGrande = 70,
  medio = 30,
  piccolo = 18
}



@Component({
  selector: 'app-submission-result',
  templateUrl: './domanda-candidato.component.html',
  styleUrls: ['./domanda-candidato.component.scss'],
})
export class DomandaCandidatoComponent implements OnInit {

  formType = tipoForm;
  sizeType = grandezzaForm;
  $dataSet: Observable<DomandaDinamica[]>;

  constructor(private rest: RestService) {
    this.$dataSet = this.rest.getDomandaDinamica();
  }

  ngOnInit(): void {}

}




