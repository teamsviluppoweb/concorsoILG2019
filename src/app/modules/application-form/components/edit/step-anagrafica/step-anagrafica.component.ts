import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {FormBuilder, FormGroup} from '@angular/forms';

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
      Via: [''],
    });


    this.domandaService.getDomanda().subscribe((data: any) => {
        this.anagraficaForm.patchValue({
          Cognome : data.Anagrafica.Cognome,
          Nome: data.Anagrafica.Nome,
          CodiceFiscale: data.Anagrafica.CodiceFiscale,
          Residenza: data.Anagrafica.ProvinciaNascita,
          Via: data.Anagrafica.Residenza
        });
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


  get Via() {
    return this.anagraficaForm.get('Via');
  }


}
