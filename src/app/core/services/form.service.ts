import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomandaService} from './domanda.service';
import {RestService} from './rest.service';
import {CustomValidators} from '../../shared/validators/customValidators';
import {environment} from '../../../environments/environment';
import {dataDropdown} from '../../modules/application-form/data-dropdown';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  form: FormGroup;

  constructor(private domandaService: DomandaService,
              private http: RestService,
              private formBuilder: FormBuilder) { }


  createForm() {
    this.form = this.formBuilder.group({
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
        ausiliProva: [false],
        tempiAggiuntiviProva: [false],
        esenzioneProvaSelettiva: [false],
      }),
      formDichiarazione: this.formBuilder.group({
        approvazione: ['', [Validators.required]],
      }),
    });
    return this.form;
  }

  /* Se la domanda è modificabile allora rimuovo il form delle dichiarazioni */
  removeDichiarazioni(fg: FormGroup) {
    this.approvazione.clearValidators();
    this.approvazione.updateValueAndValidity();
  }

  /**
   * Aggiorna i dati primitivi del form con i dati della domanda se essa è stat giò inviata. Gli oggetti
   * non vengono patchati perchè si assegnano per referenza non valore.
   * @param fg = Il formgroup che contiene tutta la domanda: anagrafica, titoli di studio, lingue straniere ecc . . .
   */
  patchForm(fg: FormGroup) {
    this.dataConseguimento.patchValue(this.domandaService.domandaobj.domanda.titoloStudioPosseduto.dataConseguimento);
    if (this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzoIstituto !== null) {
      this.indirizzoFisico.patchValue(this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzoIstituto);
    }
    this.nomeIstituto.patchValue(this.domandaService.domandaobj.domanda.titoloStudioPosseduto.istituto);

    if (this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio !== null) {
      this.altroIndirizzo.patchValue(this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio);
    }


    if (this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
      const inv = this.domandaService.domandaobj.domanda.invaliditaCivile;

      this.ausiliProva.patchValue(inv.ausili);
      this.dataCertificazione.patchValue(inv.dataCertificazione);
      this.invaliditaEnte.patchValue(inv.enteCertificatore);
      this.esenzioneProvaSelettiva.patchValue(inv.esenteProvaPreselettiva);
      this.percInvalidita.patchValue(inv.percentuale);
      this.tempiAggiuntiviProva.patchValue(inv.tempiAggiuntivi);
    }


  }


  /**
   * Serializza i dati per farli combaciare con quelli del modello json della domanda
   */
  formToJson() {
    this.formIstruzioneToJson();
    this.formLinguaToJson();
    this.formTitoliToJson();
    this.formRiserveToJson();
    this.formInvaliditaToJson();
  }

  private formIstruzioneToJson() {
    // Se è la prima volta che la domanda viene compilata tolgo il null alle sezioni obbligatorie



    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.tipologia = this.tipologia.value;
    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo = this.titolo.value;

    if (this.indirizzo.value === null) {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo = null;
    } else {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo = this.indirizzo.value;
      if (this.indirizzo.value.id === dataDropdown.altriIndirizziId) {
        this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = this.altroIndirizzo.value;
      } else {
        this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = null;
      }
    }

    if (this.altroIndirizzo.value !== null) {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = this.altroIndirizzo.value;
    }

    if (this.indirizzoFisico.value !== null) {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzoIstituto = this.indirizzoFisico.value;
    }

    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.istituto = this.nomeIstituto.value;
    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.dataConseguimento = this.dataConseguimento.value;
    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto = {
      codice: this.comuneIstituto.value.codice,
      nome: this.comuneIstituto.value.nome,
      codiceProvincia: this.provinciaIstituto.value.codice,
    };
  }

  private formLinguaToJson() {
    this.domandaService.domandaobj.domanda.lingua = this.linguaSelezionata.value;
  }

  private formTitoliToJson() {
    if (this.aventeTitoli.value === 'NO') {
      this.domandaService.domandaobj.domanda.lstTitoliPreferenziali = [];
      this.domandaService.domandaobj.domanda.numeroFigli = 0;
    }

    if (this.aventeTitoli.value === 'SI') {
      this.domandaService.domandaobj.domanda.lstTitoliPreferenziali = this.titoliSelezionati.value;

      if (this.titoliSelezionati.value.map(k => k.id).includes(dataDropdown.aventeFigliId)) {
        this.domandaService.domandaobj.domanda.numeroFigli = this.numeroFigliSelezionati.value;
      } else {
        this.domandaService.domandaobj.domanda.numeroFigli = 0;
      }
    }
  }

  private formRiserveToJson() {
    this.domandaService.domandaobj.domanda.lstRiserve = this.riserveSelezionate.value;
  }

  private formInvaliditaToJson() {

    if (this.appartenenza.value === 'SI') {
      this.domandaService.domandaobj.domanda.invaliditaCivile = {
        luogoRilascio: {
          codice: this.comune.value.codice,
          nome: this.comune.value.nome,
          codiceProvincia: this.provincia.value.codice
        },
        dataCertificazione: this.dataCertificazione.value,
        percentuale: this.percInvalidita.value,
        enteCertificatore: this.invaliditaEnte.value,
        ausili: this.ausiliProva.value,
        esenteProvaPreselettiva: this.esenzioneProvaSelettiva.value,
        tempiAggiuntivi: this.tempiAggiuntiviProva.value
      };

    } else {
      this.domandaService.domandaobj.domanda.invaliditaCivile = null;
    }
  }

  /*
    REACTIVE FORM BOILER TEMPLATE
  */

  get tipologia() {
    return this.form.get('formIstruzione.tipologia');
  }

  get titolo() {
    return this.form.get('formIstruzione.titolo');
  }

  get indirizzo() {
    return this.form.get('formIstruzione.indirizzo');
  }

  get dataConseguimento() {
    return this.form.get('formIstruzione.dataConseguimento');
  }

  get nomeIstituto() {
    return this.form.get('formIstruzione.nomeIstituto');
  }

  get indirizzoFisico() {
    return this.form.get('formIstruzione.indirizzoFisico');
  }

  get altroIndirizzo() {
    return this.form.get('formIstruzione.altroIndirizzo');
  }

  get provinciaIstituto() {
    return this.form.get('formIstruzione.provinciaIstituto');
  }

  get comuneIstituto() {
    return this.form.get('formIstruzione.comuneIstituto');
  }

  get linguaSelezionata() {
    return this.form.get('formLingua.linguaSelezionata');
  }

  get titoliSelezionati() {
    return this.form.get('formTitoliPreferenziali.titoliSelezionati');
  }

  get numeroFigliSelezionati() {
    return this.form.get('formTitoliPreferenziali.numeroFigliSelezionati');
  }

  get aventeTitoli() {
    return this.form.get('formTitoliPreferenziali.aventeTitoli');
  }

  get riserveSelezionate() {
    return this.form.get('formRiserve.riserveSelezionate');
  }

  get aventeRiserve() {
    return this.form.get('formRiserve.aventeRiserve');
  }

  get comuniDropdown() {
    return this.form.get('formIstruzione.comuniDropdown');
  }

  get provinceDropdown() {
    return this.form.get('formIstruzione.provinceDropdown');
  }

  get tipologiaDropdown() {
    return this.form.get('formIstruzione.tipologiaDropdown');
  }

  get titoloDropdown() {
    return this.form.get('formIstruzione.titoloDropdown');
  }

  get indirizzoDropdown() {
    return this.form.get('formIstruzione.indirizzoDropdown');
  }

  get appartenenza() {
    return this.form.get('formCategorieProtette.appartenenza');
  }

  get percInvalidita() {
    return this.form.get('formCategorieProtette.percInvalidita');
  }

  get dataCertificazione() {
    return this.form.get('formCategorieProtette.dataCertificazione');
  }

  get invaliditaEnte() {
    return this.form.get('formCategorieProtette.invaliditaEnte');
  }

  get ausiliProva() {
    return this.form.get('formCategorieProtette.ausiliProva');
  }

  get tempiAggiuntiviProva() {
    return this.form.get('formCategorieProtette.tempiAggiuntiviProva');
  }

  get esenzioneProvaSelettiva() {
    return this.form.get('formCategorieProtette.esenzioneProvaSelettiva');
  }

  get comune() {
    return this.form.get('formCategorieProtette.comune');
  }

  get comuniDropdownCat() {
    return this.form.get('formCategorieProtette.comuniDropdown');
  }

  get provincia() {
    return this.form.get('formCategorieProtette.provincia');
  }

  get provinceDropdownCat() {
    return this.form.get('formCategorieProtette.provinceDropdown');
  }

  get approvazione() {
  return this.form.get('formDichiarazione.approvazione');
  }

}
