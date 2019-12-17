import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {DomandaService} from '../../../../../core/services/domanda.service';

import {MatStepper} from '@angular/material';
import {TitoloPreferenziale} from '../../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../../core/services/rest.service';
import {filter} from 'rxjs/operators';

/* TODO: Cambiare mat toggle button con butotn per poter usare 2 way binding */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-titoli-preferenziali',
  templateUrl: './step-titoli-preferenziali.component.html',
  styleUrls: ['./step-titoli-preferenziali.component.scss'],
})
export class StepTitoliPreferenzialiComponent implements OnInit {

  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;
  elencoTitoliPreferenziali: TitoloPreferenziale[];
  isDomandaInvita: boolean;




  constructor(private domandaService: DomandaService, private rest: RestService
  ) {}

  ngOnInit() {
    this.isDomandaInvita = this.domandaService.domandaobj.operazione ===  1;

    this.onChanges();
    this.rest.getTitoliPreferenziali().subscribe( (data: TitoloPreferenziale[]) => {
      this.elencoTitoliPreferenziali = data;

      // Se le domanda è stata già inviata controllo se ci sono titoli altrimenti setto a NO
      if (this.isDomandaInvita) {
        if (this.domandaService.domandaobj.domanda.lstTitoliPreferenziali.length > 0) {
          this.aventeTitoli.patchValue('SI');

          const titoliScelti: TitoloPreferenziale[] = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.elencoTitoliPreferenziali.length; i++) {
            // tslint:disable-next-line:prefer-for-of
            for (let k = 0; k < this.domandaService.domandaobj.domanda.lstTitoliPreferenziali.length; k++) {
              if (this.elencoTitoliPreferenziali[i].id === this.domandaService.domandaobj.domanda.lstTitoliPreferenziali[k].id) {
                titoliScelti.push(this.elencoTitoliPreferenziali[i]);
              }
            }
          }

          this.titoliSelezionati.patchValue(titoliScelti);

          } else {
            this.aventeTitoli.patchValue('NO');
          }
        }
    });

  }


  onChanges() {

    this.aventeTitoli.valueChanges.subscribe((x: string) => {
      if (this.aventeTitoli.value === 'SI') {
        this.titoliSelezionati.setValidators([Validators.required]);
      }
      if (this.aventeTitoli.value === 'NO') {
        this.titoliSelezionati.setValidators([]);
        this.numeroFigliSelezionati.setValidators([]);

        this.titoliSelezionati.patchValue(null);
        this.numeroFigliSelezionati.patchValue(null);
      }
      this.titoliSelezionati.updateValueAndValidity();
      this.numeroFigliSelezionati.updateValueAndValidity();
    });

    this.titoliSelezionati.valueChanges
      .pipe(
        filter((x) => this.titoliSelezionati.value !== null)
      )
      .subscribe((x: TitoloPreferenziale[]) => {

        // Da fare attenzione se 17 è un numero o stringa
        // @ts-ignore
        if (x.map(k => k.id).includes('17')) {
          console.log('required');
          this.numeroFigliSelezionati.setValidators([Validators.required]);

          if (this.isDomandaInvita && this.domandaService.domandaobj.domanda.numeroFigli !== null) {
            this.numeroFigliSelezionati.patchValue(this.domandaService.domandaobj.domanda.numeroFigli.toString());
          }

        } else {
          this.numeroFigliSelezionati.setValidators([]);
          this.numeroFigliSelezionati.patchValue(null);
        }
        this.numeroFigliSelezionati.updateValueAndValidity();

    });

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
