import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormGroup, Validators} from '@angular/forms';
import {DomandaService} from '../../../../../core/services/domanda.service';

import {MatStepper} from '@angular/material';
import {TitoloPreferenziale} from '../../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../../core/services/rest.service';

/* TODO: Cambiare mat toggle button con butotn per poter usare 2 way binding */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-titoli-preferenziali',
  templateUrl: './step-titoli-preferenziali.component.html',
  styleUrls: ['./step-titoli-preferenziali.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTitoliPreferenzialiComponent implements OnInit {
  /* Lo uso per triggerare l'errore in caso l'utente vada avanti senza aver scelto la lingua, mat-error non funziona
 su mat toggle button perchè non è 2 way binding,  */
  clicker: boolean;
  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;
  elencoTitoliPreferenziali: TitoloPreferenziale[];




  constructor(private domandaService: DomandaService, private rest: RestService
  ) {
    this.clicker = false;
  }

  ngOnInit() {

    this.numeroFigliSelezionati.patchValue('');

    this.onChanges();
    this.rest.getTitoliPreferenziali().subscribe( (data: TitoloPreferenziale[]) => {
      this.elencoTitoliPreferenziali = data;
      if (this.domandaService.domandaobj.operazione === 1) {

        if (this.domandaService.domandaobj.domanda.lstTitoliPreferenziali.length > 0) {

          const titoliScelti: TitoloPreferenziale[] = [];

          for (let i = 0; i < this.elencoTitoliPreferenziali.length; i++) {
            for (let k = 0; k < this.domandaService.domandaobj.domanda.lstTitoliPreferenziali.length; k++) {
              if (this.elencoTitoliPreferenziali[i].id === this.domandaService.domandaobj.domanda.lstTitoliPreferenziali[k].id) {
                titoliScelti.push(this.elencoTitoliPreferenziali[i]);
              }
            }
          }

          this.aventeTitoli.patchValue('SI');
          this.titoliSelezionati.patchValue(titoliScelti);


          } else {
            this.aventeTitoli.patchValue('NO');
          }
        }
    });

  }


  onChanges() {

    this.aventeTitoli.valueChanges.subscribe((x: any[]) => {
      if (this.aventeTitoli.value === 'SI') {
        this.titoliSelezionati.setValidators(Validators.required);
      } else {
        this.titoliSelezionati.clearValidators();
        this.titoliSelezionati.reset();
        this.titoliSelezionati.patchValue([]);
      }
      this.titoliSelezionati.updateValueAndValidity();
    });

    this.titoliSelezionati.valueChanges.subscribe((x: TitoloPreferenziale[]) => {

      // @ts-ignore
      if (x !== null && x !== 'undefined') {
        if (x.map(k => k.id).includes(17)) {
          this.numeroFigliSelezionati.setValidators(Validators.required);
        } else {
          this.numeroFigliSelezionati.clearValidators();
          this.numeroFigliSelezionati.reset();
        }
        this.numeroFigliSelezionati.updateValueAndValidity();
      }

      this.domandaService.domandaobj.domanda.lstTitoliPreferenziali = this.titoliSelezionati.value;

    });

    this.numeroFigliSelezionati.valueChanges.subscribe(
      (x) => {
        if (this.titoliSelezionati.value !== null && this.titoliSelezionati.value !== 'undefined') {
          if (this.titoliSelezionati.value.map(k => k.id).includes(17)) {

            if (this.domandaService.domandaobj.operazione === 1 ) {
              // this.numeroFigliSelezionati.patchValue(this.domandaService.domandaobj.domanda.numFigli);
            } else {
              this.domandaService.domandaobj.domanda.numFigli = x;
            }

          }
        } else {
          this.domandaService.domandaobj.domanda.numFigli = 0;
        }
      }
    );

  }


  ParseTitoliPreferenziali() {
    this.clicker = true;
  }


  get titoliSelezionati() {
    return this.parent.get('formTitoliPreferenziali.titoliSelezionati');
  }

  get numeroFigliSelezionati() {
    return this.parent.get('formTitoliPreferenziali.numeroFigliSelezionati');
  }

  get aventeTitoli() {
    return this.parent.get('formTitoliPreferenziali.aventeTitoli');
  }

  allowNextStep() {
    return !this.parent.controls.formTitoliPreferenziali.valid;
  }
}
