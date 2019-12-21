import { Injectable } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
      formIstruzione: this.createIstruzioneFg(),
      formLingua: this.createLinguaFg(),
      formTitoliPreferenziali: this.createTitoliPreferenzialiFg(),
      formRiserve: this.formBuilder.group({
        aventeRiserve: [null, Validators.required],
        riserveSelezionate: [[], []],
      }),
      formCategorieProtette: this.createCategorieProtetteFg(),
      formDichiarazione: this.createDichiarazioniFg(),
    });
    return this.form;
  }

  private createIstruzioneFg() {
    return this.formBuilder.group({
      tipologia: [null, [Validators.required]],
      titolo: [null],
      indirizzo: [null],
      nomeIstituto: [null, [Validators.required]],
      indirizzoFisico: [null],
      altroIndirizzo: [null],
      dataConseguimento: [null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.max(new Date().getFullYear()),
        CustomValidators.onlyNumber]],
      // DROPDOWN
      provinciaIstituto: [null, Validators.required],
      comuneIstituto: [null, Validators.required],
    });
  }
  private createLinguaFg() {
    return  this.formBuilder.group({
      linguaSelezionata: [null, [Validators.required]],
    });
  }
  private createTitoliPreferenzialiFg() {
    return  this.formBuilder.group({
      aventeTitoli: [null, Validators.required],
      titoliSelezionati: [[], []],
      numeroFigliSelezionati: [null, []],
    });
  }
  private createCategorieProtetteFg() {
    return this.formBuilder.group({
      appartenenza: [null, [Validators.required]],
      percInvalidita: [null],
      dataCertificazione: [null],
      comune: [null],
      provincia: [null],
      invaliditaEnte: [null],
      ausiliProva: [false],
      tempiAggiuntiviProva: [false],
      esenzioneProvaSelettiva: [false],
    });
  }
  private createDichiarazioniFg() {
    return this.formBuilder.group({
      approvazione: [false, [Validators.required, CustomValidators.onlyTrue]],
    });
  }

  /* Se la domanda è modificabile allora rimuovo il form delle dichiarazioni */
  removeDichiarazioni(fg: FormGroup) {
    this.approvazione.clearValidators();
    this.approvazione.updateValueAndValidity();
  }

  /**
   * Aggiorna i dati primitivi del form con i dati della domanda se essa è stata giò inviata. Gli oggetti
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
  serializeForm() {


    this.serializeIstruzioneFg();
    this.serializeLingueFg();
    this.serializeTitoliFg();
    this.serializeRiserveFg();
    this.serializeInvaliditaFg();
  }

  private serializeIstruzioneFg() {
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

  private serializeLingueFg() {
    this.domandaService.domandaobj.domanda.lingua = this.linguaSelezionata.value;
  }

  private serializeTitoliFg() {
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

  private serializeRiserveFg() {
    this.domandaService.domandaobj.domanda.lstRiserve = this.riserveSelezionate.value;
  }

  private serializeInvaliditaFg() {

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

  patchFromObject(jsonData: string | number, dataSet: any[], formControl: AbstractControl, iterateOver: string) {
    formControl.patchValue(
      dataSet.filter(x => x[iterateOver] === jsonData)[0]
    );
  }

  /* Se il candidato non ha invalidità rimuove i validators assegnati in caso abbia selezionato si e poi ricliccati su no */
  clearValidatorsInvalidita() {
    this.percInvalidita.clearValidators();
    this.percInvalidita.updateValueAndValidity();

    this.dataCertificazione.clearValidators();
    this.dataCertificazione.updateValueAndValidity();

    this.invaliditaEnte.clearValidators();
    this.invaliditaEnte.updateValueAndValidity();

    this.provincia.clearValidators();
    this.provincia.updateValueAndValidity();

    this.comune.clearValidators();
    this.comune.updateValueAndValidity();

  }


  setValidatorsInvalidita() {
    this.percInvalidita.setValidators(
      [ Validators.required,
        Validators.max(100),
        Validators.min(1),
        CustomValidators.onlyNumber]);
    this.dataCertificazione.setValidators(Validators.required);
    this.invaliditaEnte.setValidators([Validators.required, Validators.maxLength(255)]);
    this.comune.setValidators(Validators.required);
    this.provincia.setValidators(Validators.required);

    this.form.get('formCategorieProtette').updateValueAndValidity();
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

  get provincia() {
    return this.form.get('formCategorieProtette.provincia');
  }

  get approvazione() {
  return this.form.get('formDichiarazione.approvazione');
  }

}
