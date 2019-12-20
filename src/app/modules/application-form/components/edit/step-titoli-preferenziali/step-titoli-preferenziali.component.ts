import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {DomandaService} from '../../../../../core/services/domanda.service';

import {MatStepper} from '@angular/material';
import {TitoloPreferenziale} from '../../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../../core/services/rest.service';
import {filter} from 'rxjs/operators';
import {FormService} from '../../../../../core/services/form.service';
import {dataDropdown} from '../../../data-dropdown';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-titoli-preferenziali',
  templateUrl: './step-titoli-preferenziali.component.html',
  styleUrls: ['./step-titoli-preferenziali.component.scss'],
})
export class StepTitoliPreferenzialiComponent implements OnInit {
  aventeFigli = dataDropdown.aventeFigliId;
  @Input() form: FormGroup;

  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;
  elencoTitoliPreferenziali: TitoloPreferenziale[];




  constructor(private domandaService: DomandaService,
              private formService: FormService,
              private rest: RestService
  ) {}

  ngOnInit() {

    this.onChanges();
    this.rest.getTitoliPreferenziali().subscribe( (data: TitoloPreferenziale[]) => {
      this.elencoTitoliPreferenziali = data;

      // Se le domanda è stata già inviata controllo se ci sono titoli altrimenti setto a NO
      if (this.domandaService.isEditable) {
        if (this.domandaService.domandaobj.domanda.lstTitoliPreferenziali.length > 0) {
          this.formService.aventeTitoli.patchValue('SI');

          const titoliScelti: TitoloPreferenziale[] = [];

          /**
           * Confronta i titoli scelti con quelli della lista, e assegna i titoli alla lista usando come datasource ElencoTitoliPreferenziali
           */
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.elencoTitoliPreferenziali.length; i++) {
            // tslint:disable-next-line:prefer-for-of
            for (let k = 0; k < this.domandaService.domandaobj.domanda.lstTitoliPreferenziali.length; k++) {
              if (this.elencoTitoliPreferenziali[i].id === this.domandaService.domandaobj.domanda.lstTitoliPreferenziali[k].id) {
                titoliScelti.push(this.elencoTitoliPreferenziali[i]);
              }
            }
          }
          this.formService.titoliSelezionati.patchValue(titoliScelti);

          } else {
            this.formService.aventeTitoli.patchValue('NO');
          }
        }
    });

  }


  onChanges() {

    this.formService.aventeTitoli.valueChanges.subscribe((x: string) => {
      if (this.formService.aventeTitoli.value === 'SI') {
        this.formService.titoliSelezionati.setValidators([Validators.required]);
      }
      if (this.formService.aventeTitoli.value === 'NO') {
        this.formService.titoliSelezionati.setValidators([]);
        this.formService.numeroFigliSelezionati.setValidators([]);

        this.formService.titoliSelezionati.patchValue(null);
        this.formService.numeroFigliSelezionati.patchValue(null);
      }
      this.formService.titoliSelezionati.updateValueAndValidity();
      this.formService.numeroFigliSelezionati.updateValueAndValidity();
    });

    this.formService.titoliSelezionati.valueChanges
      .pipe(
        filter((x) => this.formService.titoliSelezionati.value !== null)
      )
      .subscribe((x: TitoloPreferenziale[]) => {

        /** Se è stato scelto il titolo con id 17 allora, rappresenta il titolo avente figli dunque visualizzo il form seleziona
         * numero figlip
         */
        // @ts-ignore
        if (x.map(k => k.id).includes(this.aventeFigli)) {
          console.log('required');
          this.formService.numeroFigliSelezionati.setValidators([Validators.required]);

          if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.numeroFigli !== 0) {
            this.formService.numeroFigliSelezionati.patchValue(this.domandaService.domandaobj.domanda.numeroFigli.toString());
          }

        } else {
          this.formService.numeroFigliSelezionati.setValidators([]);
          this.formService.numeroFigliSelezionati.patchValue(null);
        }
        this.formService.numeroFigliSelezionati.updateValueAndValidity();

    });

  }


  getSingleForm(id: string) {
    return this.formService.form.get('formTitoliPreferenziali.' + id);
  }



}
