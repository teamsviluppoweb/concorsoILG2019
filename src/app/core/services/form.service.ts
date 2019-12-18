import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomandaService} from './domanda.service';
import {RestService} from './rest.service';
import {CustomValidators} from '../../shared/validators/customValidators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  parent: FormGroup;

  constructor(private domanda: DomandaService, private http: RestService, private formBuilder: FormBuilder) { }

  createForm() {
    this.parent = this.formBuilder.group({
      formIstruzione: this.formBuilder.group({
        tipologia: ['', [Validators.required]],
        titolo: [''],
        indirizzo: [''],
        nomeIstituto: ['', [Validators.required]],
        indirizzoFisico: [''],
        altroIndirizzo: [''],
        dataConseguimento: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.max(new Date().getFullYear()),
          CustomValidators.onlyNumber]],
        // DROPDOWN
        provinciaIstituto: ['', Validators.required],
        comuneIstituto: ['', Validators.required],
        comuniDropdown: [],
        provinceDropdown: [],
        tipologiaDropdown: [],
        titoloDropdown: [],
        indirizzoDropdown: [],
      }),
      formLingua: this.formBuilder.group({
        linguaSelezionata: ['', [Validators.required]],
      }),
      formTitoliPreferenziali: this.formBuilder.group({
        aventeTitoli: ['', Validators.required],
        titoliSelezionati: [[], []],
        numeroFigliSelezionati: [null, []],
      }),
      formRiserve: this.formBuilder.group({
        aventeRiserve: ['', Validators.required],
        riserveSelezionate: [[], []],
      }),
      formCategorieProtette: this.formBuilder.group({
        appartenenza: ['', [Validators.required]],
        percInvalidita: [''],
        dataCertificazione: [''],
        comune: [''],
        comuniDropdown: [''],
        provincia: [''],
        provinceDropdown: [''],
        invaliditaEnte: [''],
        ausiliProva: [''],
        tempiAggiuntiviProva: [''],
        esenzioneProvaSelettiva: [''],
      }),
      formDichiarazione: this.formBuilder.group({
        approvazione: ['', [Validators.required]],
      }),
    });
    return this.parent;
  }

  removeDichiarazioni(fg: FormGroup) {
    fg.get('formDichiarazione.approvazione').clearValidators();
    fg.get('formDichiarazione.approvazione').updateValueAndValidity();
  }

  // Esegue il patch solo ai dati statici, i dati dinamici vengono patchati nel componente

  patchForm(fg: FormGroup) {
    fg.get('formIstruzione.dataConseguimento').patchValue(this.domanda.domandaobj.domanda.titoloStudioPosseduto.dataConseguimento);
    fg.get('formIstruzione.indirizzoFisico').patchValue(this.domanda.domandaobj.domanda.titoloStudioPosseduto.indirizzoIstituto);
    fg.get('formIstruzione.nomeIstituto').patchValue(this.domanda.domandaobj.domanda.titoloStudioPosseduto.istituto);

    if (this.domanda.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio !== null) {
      fg.get('formIstruzione.altroIndirizzo').patchValue(this.domanda.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio);
    }



  }

  patchLingua() {

  }





  /*
    REACTIVE FORM BOILER TEMPLATE
  */

  get tipologia() {
    return this.parent.get('formIstruzione.tipologia');
  }

  get titolo() {
    return this.parent.get('formIstruzione.titolo');
  }

  get indirizzo() {
    return this.parent.get('formIstruzione.indirizzo');
  }

  get dataConseguimento() {
    return this.parent.get('formIstruzione.dataConseguimento');
  }

  get nomeIstituto() {
    return this.parent.get('formIstruzione.nomeIstituto');
  }

  get indirizzoFisico() {
    return this.parent.get('formIstruzione.indirizzoFisico');
  }

  get altroIndirizzo() {
    return this.parent.get('formIstruzione.altroIndirizzo');
  }

  get provinciaIstituto() {
    return this.parent.get('formIstruzione.provinciaIstituto');
  }

  get comuneIstituto() {
    return this.parent.get('formIstruzione.comuneIstituto');
  }


  get linguaSelezionata() {
    return this.parent.get('formLingua.linguaSelezionata');
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


  // DROPDOWN



  get comuniDropdown() {
    return this.parent.get('formIstruzione.comuniDropdown');
  }

  get provinceDropdown() {
    return this.parent.get('formIstruzione.provinceDropdown');
  }

  get tipologiaDropdown() {
    return this.parent.get('formIstruzione.tipologiaDropdown');
  }

  get titoloDropdown() {
    return this.parent.get('formIstruzione.titoloDropdown');
  }

  get indirizzoDropdown() {
    return this.parent.get('formIstruzione.indirizzoDropdown');
  }



}
