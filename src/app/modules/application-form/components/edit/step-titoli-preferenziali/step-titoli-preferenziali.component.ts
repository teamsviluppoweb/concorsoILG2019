import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormGroup, Validators} from '@angular/forms';
import {DomandaService} from '../../../../../core/services/domanda.service';

import {Domanda} from '../../../../../core/models';
import {Titolo, Titoli} from '../../../../../core/models';
import {MatStepper} from '@angular/material';
import {concatMap} from 'rxjs/operators';

/* TODO: Cambiare mat toggle button con butotn per poter usare 2 way binding */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-titoli-preferenziali',
  templateUrl: './step-titoli-preferenziali.component.html',
  styleUrls: ['./step-titoli-preferenziali.component.scss']
})
export class StepTitoliPreferenzialiComponent implements OnInit {
  /* Lo uso per triggerare l'errore in caso l'utente vada avanti senza aver scelto la lingua, mat-error non funziona
 su mat toggle button perchè non è 2 way binding,  */
  clicker: boolean;
  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;
  elencoTitoliPreferenziali: Titoli[];




  constructor(private domandaService: DomandaService,
  ) {
    this.clicker = false;
  }

  ngOnInit() {

    this.numeroFigliSelezionati.patchValue('');

    this.onChanges();
    this.domandaService.getTitoliPreferenziali()
      .pipe(
        concatMap( (titoli: Titoli[]) => {
          this.elencoTitoliPreferenziali = titoli;
          return this.domandaService.getDomanda();
          }
        )
      ).subscribe( (domanda: Domanda) => {
      if (domanda.DomandaConcorso.Stato === 1) {
          if (domanda.TitoliPreferenziali.length > 0) {
            this.aventeTitoli.patchValue('SI');

            const test = this.elencoTitoliPreferenziali.filter((x) => {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < domanda.TitoliPreferenziali.length; i++) {
                if (x.Id === domanda.TitoliPreferenziali[i].Id) {
                  return x;
                }
              }
            });

            console.log('numero figli', this.domandaService.domanda);


            this.numeroFigliSelezionati.patchValue(this.domandaService.domanda.NumeroFigli);

            console.log('test', test);

            this.titoliSelezionati.patchValue(test);

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

    this.titoliSelezionati.valueChanges.subscribe((x: Titolo[]) => {

      // @ts-ignore
      if (x !== null && x !== 'undefined') {
        if (x.map(k => k.Id).includes(17)) {
          this.numeroFigliSelezionati.setValidators(Validators.required);
        } else {
          this.numeroFigliSelezionati.clearValidators();
          this.numeroFigliSelezionati.reset();
        }
        this.numeroFigliSelezionati.updateValueAndValidity();
      }

      this.domandaService.domanda.TitoliPreferenziali = this.titoliSelezionati.value;

    });

    this.numeroFigliSelezionati.valueChanges.subscribe(
      (x) => {
        if (this.titoliSelezionati.value !== null && this.titoliSelezionati.value !== 'undefined') {
          if (this.titoliSelezionati.value.map(k => k.Id).includes(17)) {
            this.domandaService.domanda.NumeroFigli = x;
          }
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
}
