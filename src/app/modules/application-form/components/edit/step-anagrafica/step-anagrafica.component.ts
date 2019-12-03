import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DomandaObj} from '../../../../../core/models/domanda/domanda.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'anagrafica-childform',
  templateUrl: './step-anagrafica.component.html',
  styleUrls: ['./step-anagrafica.component.scss'],
})
export class StepAnagraficaComponent implements OnInit {

  anagraficaForm: FormGroup;

  constructor(private domandaService: DomandaService, private formBuilder: FormBuilder) {

    this.anagraficaForm = this.formBuilder.group({
      Cognome: [''],
      Nome: [''],
      CodiceFiscale: [''],
      Residenza: [''],
    });


    this.domandaService.getDomanda().subscribe((data: DomandaObj) => {

      console.log('-------------');
      console.log(this.domandaService.domandaobj);
      console.log('-------------');

      const agf = data.domanda.anagCandidato;
      this.anagraficaForm.patchValue({
        Cognome: [agf.cognome],
        Nome: [agf.nome],
        CodiceFiscale: [agf.codiceFiscale],
        Residenza: [agf.residenza],
      }, {emitEvent: false});
    });



  }

  ngOnInit() {
  }


  get Cognome() {
    return this.anagraficaForm.get('Cognome');
  }


  get Nome() {
    return this.anagraficaForm.get('Nome');
  }


  get CodiceFiscale() {
    return this.anagraficaForm.get('CodiceFiscale');
  }


  get Residenza() {
    return this.anagraficaForm.get('Residenza');
  }



}
