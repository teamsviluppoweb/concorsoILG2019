import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-invia-domanda',
  templateUrl: './step-invia-domanda.component.html',
  styleUrls: ['./step-invia-domanda.component.scss']
})
export class StepInviaDomandaComponent implements OnInit {

  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  constructor(private domandaService: DomandaService, private router: Router) {
  }

  inviaDomanda() {

      this.domandaService.domandaobj.domanda.stato = 1;

      if (!this.domandaService.domandaobj.domanda.lstTitoliPreferenziali.map(k => k.id).includes(17)) {
      this.domandaService.domandaobj.domanda.numFigli = '';
    }

      this.domandaService.putDomanda(this.domandaService.domandaobj.domanda).subscribe(
      () => {
        localStorage.setItem('domanda', JSON.stringify(this.domandaService.domandaobj));
        this.domandaService.sendMessage('Modifica Domanda');
        this.domandaService.sendStato(true);

        console.log(this.domandaService.domandaobj.domanda);

        this.router.navigate(['/user']);
      }
    );
  }

  ngOnInit() {
  }

  get istitutoFrequentato() {
    return this.parent.get('formIstruzione.istitutoFrequentato');
  }

  get tipoDiploma() {
    return this.parent.get('formIstruzione.tipoDiploma');
  }

  get provinciaIstituto() {
    return this.parent.get('formIstruzione.provinciaIstituto');
  }

  get provinceDropdown() {
    return this.parent.get('formIstruzione.provinceDropdown');
  }

  get comuneIstituto() {
    return this.parent.get('formIstruzione.comuneIstituto');
  }

  get comuniDropdown() {
    return this.parent.get('formIstruzione.comuniDropdown');
  }

  get viaIstituto() {
    return this.parent.get('formIstruzione.viaIstituto');
  }

  get annoDiploma() {
    return this.parent.get('formIstruzione.annoDiploma');
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

  get riserveSelezionate() {
    return this.parent.get('formRiserve.riserveSelezionate');
  }

  get aventeRiserve() {
    return this.parent.get('formRiserve.aventeRiserve');
  }

  get linguaSelezionata() {
    return this.parent.get('formLingua.linguaSelezionata');
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
