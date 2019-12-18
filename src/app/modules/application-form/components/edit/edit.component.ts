import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DomandaService} from '../../../../core/services/domanda.service';
import {FormService} from '../../../../core/services/form.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EditComponent {
  moduloDomanda: FormGroup;
  shouldBeLinear = true;
  domandaPrecedente;

  // I seguenti check vengono usati per stabilire se l'utente può iniziare il prossimo step
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

  get isDirty(): boolean {
    this.moduloDomanda = this.moduloDomanda.value;
    return JSON.stringify(this.domandaPrecedente) !== JSON.stringify(this.moduloDomanda.value);
  }


  displayDichiarazioni() {
    return !this.domandaService.isEditable;
  }

}
