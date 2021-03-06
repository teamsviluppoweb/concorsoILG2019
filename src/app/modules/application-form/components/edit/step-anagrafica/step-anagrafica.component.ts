import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'anagrafica-childform',
  templateUrl: './step-anagrafica.component.html',
  styleUrls: ['./step-anagrafica.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepAnagraficaComponent implements OnInit {

  anagraficaForm: FormGroup;

  constructor(private domandaService: DomandaService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const agf = this.domandaService.domandaobj.domanda.anagCandidato;
    this.anagraficaForm = this.formBuilder.group({
      Cognome: [agf.cognome],
      Nome: [agf.nome],
      CodiceFiscale: [agf.codiceFiscale],
      Residenza: [agf.residenza],
      DataNascita: [moment(agf.dataNascita).utc().format('DD/MM/YYYY')],
      LuogoNascita: [agf.comuneNascita.nome + ' (' + [agf.comuneNascita.codiceProvincia] + ')'],
      Telefono: [agf.telefono],
      Email: [agf.email],
    });
  }



}
