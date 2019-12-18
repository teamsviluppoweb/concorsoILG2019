import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StepIstruzioneComponent} from './step-istruzione/step-istruzione.component';
import {StepAnagraficaComponent} from './step-anagrafica/step-anagrafica.component';
import {StepLinguaComponent} from './step-lingua/step-lingua.component';
import {StepTitoliPreferenzialiComponent} from './step-titoli-preferenziali/step-titoli-preferenziali.component';
import {StepRiserveComponent} from './step-riserve/step-riserve.component';
import {StepCategorieProtetteComponent} from './step-categorie-protette/step-categorie-protette.component';
import {StepInviaDomandaComponent} from './step-invia-domanda/step-invia-domanda.component';
import {DomandaService} from '../../../../core/services/domanda.service';
import {FormService} from '../../../../core/services/form.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})

export class EditComponent implements OnInit {
  moduloDomanda: FormGroup;
  shouldBeLinear = true;
  domandaPrecedente;

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
    private formBuilder: FormBuilder,
    private domandaService: DomandaService,
    private formService: FormService,
    private cd: ChangeDetectorRef
  ) {

    this.shouldBeLinear = !this.domandaService.isEditable;
    this.moduloDomanda = this.formService.createForm();


    if (this.domandaService.isEditable) {
      this.formService.patchForm(this.moduloDomanda);
      this.formService.removeDichiarazioni(this.moduloDomanda);
    }

    this.istruzioneIsValid = this.moduloDomanda.controls.formIstruzione;
    this.linguaValid = this.moduloDomanda.controls.formLingua;
    this.titoliValid = this.moduloDomanda.controls.formTitoliPreferenziali;
    this.riserveValid = this.moduloDomanda.controls.formRiserve;
    this.categorieProtetteValid = this.moduloDomanda.controls.formCategorieProtette;
    this.accettazioneValid = this.moduloDomanda.controls.formDichiarazione;
  }

  ngOnInit(): void {
  }


  get isDirty(): boolean {
    this.moduloDomanda = this.moduloDomanda.value;
    return JSON.stringify(this.domandaPrecedente) !== JSON.stringify(this.moduloDomanda.value);
  }


  displayDichiarazioni() {
    return !this.domandaService.isEditable;
  }

}
