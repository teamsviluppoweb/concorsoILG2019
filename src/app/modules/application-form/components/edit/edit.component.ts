import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StepIstruzioneComponent} from './step-istruzione/step-istruzione.component';
import {StepAnagraficaComponent} from './step-anagrafica/step-anagrafica.component';
import {StepLinguaComponent} from './step-lingua/step-lingua.component';
import {StepTitoliPreferenzialiComponent} from './step-titoli-preferenziali/step-titoli-preferenziali.component';
import {StepRiserveComponent} from './step-riserve/step-riserve.component';
import {StepCategorieProtetteComponent} from './step-categorie-protette/step-categorie-protette.component';
import {StepInviaDomandaComponent} from './step-invia-domanda/step-invia-domanda.component';
import {DomandaService} from '../../../../core/services/domanda.service';
import {CustomValidators} from '../../../../shared/validators/customValidators';
import {FormService} from '../../../../core/services/form.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EditComponent implements OnInit, OnDestroy {

  moduloDomanda: FormGroup;
  domandaPrecedente;
  shouldBeLinear = true;

  @ViewChild(StepAnagraficaComponent, { static: false }) StepAnagraficaComponent: StepAnagraficaComponent;
  @ViewChild(StepIstruzioneComponent, { static: false }) StepIstruzioneComponent: StepIstruzioneComponent;
  @ViewChild(StepLinguaComponent, { static: false }) StepLinguaComponent: StepLinguaComponent;
  @ViewChild(StepTitoliPreferenzialiComponent, { static: false }) StepTitoliPreferenzialiComponent: StepTitoliPreferenzialiComponent;
  @ViewChild(StepRiserveComponent, { static: false }) StepRiserveComponent: StepRiserveComponent;
  @ViewChild(StepCategorieProtetteComponent, { static: false }) StepCategorieProtetteComponent: StepCategorieProtetteComponent;
  @ViewChild(StepInviaDomandaComponent, { static: false }) StepInviaDomandaComponent: StepInviaDomandaComponent;


  istruzioneIsValid;
  linguaValid;
  titoliValid;
  riserveValid;
  categorieProtetteValid;
  accettazioneValid;

  constructor(
    private http: DomandaService,
    private formBuilder: FormBuilder,
    private domandaService: DomandaService,
    private formService: FormService,
  ) {

    if (this.domandaService.domandaobj.operazione !== 0) {
      this.shouldBeLinear = false;
    }
    this.inizializzaDomanda();

    this.istruzioneIsValid = this.moduloDomanda.controls.formIstruzione;
    this.linguaValid = this.moduloDomanda.controls.formLingua;
    this.titoliValid = this.moduloDomanda.controls.formTitoliPreferenziali;
    this.riserveValid = this.moduloDomanda.controls.formRiserve;
    this.categorieProtetteValid = this.moduloDomanda.controls.formCategorieProtette;
    this.accettazioneValid = this.moduloDomanda.controls.formDichiarazione;
  }

  inizializzaDomanda() {
    this.moduloDomanda = this.formBuilder.group({
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
        numeroFigliSelezionati: ['', []],
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

    this.formService.serializeForm(this.moduloDomanda);

    if (this.domandaService.domandaobj.operazione === 1) {
      this.moduloDomanda.get('formDichiarazione.approvazione').clearValidators();
      this.moduloDomanda.get('formDichiarazione.approvazione').updateValueAndValidity();
    }

  }

  get isDirty(): boolean {
    this.moduloDomanda = this.moduloDomanda.value;
    return JSON.stringify(this.domandaPrecedente) !== JSON.stringify(this.moduloDomanda.value);
  }

  showDichiarazioni() {
    if (this.domandaService.domandaobj.domanda.stato === 1) {
      this.moduloDomanda.get('formDichiarazione.approvazione').setValidators([]);
      this.moduloDomanda.get('formDichiarazione.approvazione').clearValidators();

      return false;
    }
    return true;
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}
