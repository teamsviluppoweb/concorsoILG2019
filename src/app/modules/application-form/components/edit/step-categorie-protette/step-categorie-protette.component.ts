import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {CustomValidators} from '../../../../../shared/validators/customValidators';
import {DomandaService} from '../../../../../core/services/domanda.service';

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
    if (this.domandaService.domandaobj.domanda.stato === 1) {
      if (this.domandaService.domandaobj.domanda.invaliditaCivile.percentuale) {
        this.appartenenza.patchValue('SI');

        const inv = this.domandaService.domandaobj.domanda.invaliditaCivile;

        this.ausiliProva.patchValue(inv.ausili);
        this.dataCertificazione.patchValue(inv.dataCertificazione);
        this.invaliditaEnte.patchValue(inv.enteCertificatore);
        this.esenzioneProvaSelettiva.patchValue(inv.esenteProvaPreselettiva);
        this.percInvalidita.patchValue(inv.percentuale);
        this.tempiAggiuntiviProva.patchValue(inv.tempiAggiuntivi);

      } else {
        this.appartenenza.patchValue('NO');
      }
    }


    this.onChanges();
  }

  onChanges() {



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
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.dataCertificazione = x;
        }
      }
    );

    this.ausiliProva.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.ausili = x;
        }
      }
    );

    this.invaliditaEnte.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.enteCertificatore = x;
        }
      }
    );
    this.esenzioneProvaSelettiva.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.esenteProvaPreselettiva = x;
        }
      }
    );

    this.percInvalidita.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.percentuale = x;
        }
      }
    );

    this.tempiAggiuntiviProva.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.tempiAggiuntivi = x;
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

