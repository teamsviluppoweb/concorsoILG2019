import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {DomandaService} from '../../../../core/services/domanda.service';
import {FormService} from '../../../../core/services/form.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EditComponent {
  /* Se la domanda è stata già inviata l'utente non è più obbligato a seguire gli step lineari del mat-stepper */
  isStepperLinear = true;

  constructor(
    private formBuilder: FormBuilder,
    private domandaService: DomandaService,
    private formService: FormService,
  ) {
    this.formService.createForm();

    if (this.domandaService.isEditable) {
      this.isStepperLinear = false;
      this.formService.patchForm(this.formService.form);
      this.formService.removeDichiarazioni(this.formService.form);
    }

  }

  get form() {
    return this.formService.form;
  }

  /* Se la domanda è stata già inviata l'utente non deve più accettare le dichiarazioni */
  get displayDichiarazioni() {
    return !this.domandaService.isEditable;
  }

  /* I seguenti get controllano la validità del form per permettere all'utente il next step */

  get isIstruzioneFormValid(): AbstractControl {
    return this.formService.form.controls.formIstruzione;
  }

  get isLinguaFormValid(): AbstractControl {
    return this.formService.form.controls.formLingua;
  }

  get isTitoliFormValid(): AbstractControl {
    return this.formService.form.controls.formTitoliPreferenziali;
  }

  get isRiserveFormValid(): AbstractControl {
    return this.formService.form.controls.formRiserve;
  }

  get isInvaliditaValid(): AbstractControl {
    return this.formService.form.controls.formCategorieProtette;
  }
  get isDichiarazioneValid(): AbstractControl {
    return this.formService.form.controls.formDichiarazione;
  }




}
