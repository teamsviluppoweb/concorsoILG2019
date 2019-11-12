import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {CustomValidators} from '../../../../../shared/validators/customValidators';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Domanda} from '../../../../../core/models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-categorie-protette',
  templateUrl: './step-categorie-protette.component.html',
  styleUrls: ['./step-categorie-protette.component.scss']
})
export class StepCategorieProtetteComponent implements OnInit {

  @Input() parent: FormGroup;
  maxDateDataCertificazione = new Date(Date.now());
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  constructor(private domandaService: DomandaService) {
  }

  ngOnInit() {
    this.onChanges();
  }

  onChanges() {

    this.domandaService.getDomanda().subscribe(
      (domanda: Domanda) => {
        if (domanda.DomandaConcorso.Stato === 1) {
          if (domanda.Invalidita.prcInvalidita !== '' && domanda.Invalidita.prcInvalidita !== null) {
            this.appartenenza.patchValue('SI');

            console.clear();
            console.log('domanda categorie ', domanda);

            this.ausiliProva.patchValue(domanda.Invalidita.ausProva);
            this.dataCertificazione.patchValue(domanda.Invalidita.dataInvalidita);
            this.invaliditaEnte.patchValue(domanda.Invalidita.enteInvalidita);
            this.esenzioneProvaSelettiva.patchValue(domanda.Invalidita.eszProva);
            this.percInvalidita.patchValue(domanda.Invalidita.prcInvalidita);
            this.tempiAggiuntiviProva.patchValue(domanda.Invalidita.tmpAggiuntivi);

          } else {
            this.appartenenza.patchValue('NO');
          }
        }
      }
    );

    this.appartenenza.valueChanges.subscribe((x) => {

      if (x === 'SI') {
        this.percInvalidita.setValidators([Validators.required, Validators.max(100), Validators.min(1), CustomValidators.onlyNumber]);
        this.dataCertificazione.setValidators(Validators.required);
        this.invaliditaEnte.setValidators([Validators.required, Validators.maxLength(255)]);
      } else if (x === 'NO') {
        this.percInvalidita.clearValidators();
        this.percInvalidita.reset();

        this.dataCertificazione.clearValidators();
        this.dataCertificazione.reset();

        this.invaliditaEnte.clearValidators();
        this.invaliditaEnte.reset();
      }

      this.percInvalidita.updateValueAndValidity();
      this.dataCertificazione.updateValueAndValidity();
      this.invaliditaEnte.updateValueAndValidity();

    });

    this.dataCertificazione.valueChanges.subscribe(
      (x) => {
        if(x !== ""){
          this.domandaService.domanda.Invalidita.dataInvalidita = x;
        }
      }
    );

    this.ausiliProva.valueChanges.subscribe(
      (x) => {
        if(x !== ""){
          this.domandaService.domanda.Invalidita.ausProva = x;
        }
      }
    );

    this.invaliditaEnte.valueChanges.subscribe(
      (x) => {
        if(x !== ""){
          this.domandaService.domanda.Invalidita.enteInvalidita = x;
        }
      }
    );
    this.esenzioneProvaSelettiva.valueChanges.subscribe(
      (x) => {
        if(x !== ""){
          this.domandaService.domanda.Invalidita.eszProva = x;
        }
      }
    );

    this.percInvalidita.valueChanges.subscribe(
      (x) => {
        if(x !== ""){
          this.domandaService.domanda.Invalidita.prcInvalidita = x;
        }
      }
    );

    this.tempiAggiuntiviProva.valueChanges.subscribe(
      (x) => {
        if(x !== ""){
          this.domandaService.domanda.Invalidita.tmpAggiuntivi = x;
        }
      }
    );

  }

  get appartenenza() {
    return this.parent.get('formCategorieProtette.appartenenza');
  }

  get percInvalidita() {
    return this.parent.get('formCategorieProtette.percInvalidita');
  }

  get dataCertificazione() {
    return this.parent.get('formCategorieProtette.dataCertificazione');
  }

  get invaliditaEnte() {
    return this.parent.get('formCategorieProtette.invaliditaEnte');
  }

  get ausiliProva() {
    return this.parent.get('formCategorieProtette.ausiliProva');
  }

  get tempiAggiuntiviProva() {
    return this.parent.get('formCategorieProtette.tempiAggiuntiviProva');
  }

  get esenzioneProvaSelettiva() {
    return this.parent.get('formCategorieProtette.esenzioneProvaSelettiva');
  }

}

