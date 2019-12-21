import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import { MatStepper} from '@angular/material';
import {CustomValidators} from '../../../../../shared/validators/customValidators';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Comune, Provincia} from '../../../../../core/models/rest/rest-interface';
import {concatMap, filter} from 'rxjs/operators';
import {RestService} from '../../../../../core/services/rest.service';
import {FormService} from '../../../../../core/services/form.service';
import {Logger} from '../../../../../core/services';

/*
  Per la documentazione su come funziona ngx-mat-select-search leggere qui:
    https://www.npmjs.com/package/ngx-mat-select-search
 */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-categorie-protette',
  templateUrl: './step-categorie-protette.component.html',
  styleUrls: ['./step-categorie-protette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepCategorieProtetteComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;

  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  listaProvince: Provincia[];
  listaComuni: Comune[];

  /** Subject che viene emesse quando il component è distrutto */

  log: Logger;

  constructor(private domandaService: DomandaService,
              private formService: FormService,
              private detectionChange: ChangeDetectorRef,
              private rest: RestService) {
    this.log = new Logger('CATEOGORIE_PROTETTE');
  }

  ngOnInit(): void {

    this.log.debug('ngOnInit');
    this.log.debug('val comune: ', this.formService.comune.value);

    if (this.formService.appartenenza.value === 'SI') {
      this.formService.percInvalidita.setValidators(
        [ Validators.required,
          Validators.max(100),
          Validators.min(1),
          CustomValidators.onlyNumber]);
      this.formService.dataCertificazione.setValidators(Validators.required);
      this.formService.invaliditaEnte.setValidators([Validators.required, Validators.maxLength(255)]);
      this.formService.comune.setValidators(Validators.required);
      this.formService.provincia.setValidators(Validators.required);

    } else if (this.formService.appartenenza.value === 'NO') {
      this.formService.percInvalidita.clearValidators();
      this.formService.percInvalidita.reset();

      this.formService.dataCertificazione.clearValidators();
      this.formService.dataCertificazione.reset();

      this.formService.invaliditaEnte.clearValidators();
      this.formService.invaliditaEnte.reset();

      this.formService.comune.clearValidators();
      this.formService.comune.reset();

      this.formService.provincia.clearValidators();
      this.formService.provincia.reset();


      this.formService.ausiliProva.reset();
      this.formService.tempiAggiuntiviProva.reset();
      this.formService.esenzioneProvaSelettiva.reset();

    }

    this.formService.percInvalidita.updateValueAndValidity();
    this.formService.dataCertificazione.updateValueAndValidity();
    this.formService.invaliditaEnte.updateValueAndValidity();
    this.formService.comune.updateValueAndValidity();
    this.formService.provincia.updateValueAndValidity();


    /**
     * Prende la lista delle province, se la domanda ha operazione = 1, allora fa il mapping e assegna il riferimento corretto
     */
    this.rest.getProvince().subscribe(
      (province: Provincia[]) => {
        this.listaProvince = province;

        // Se la domanda è stata già mi popolo la dropdown list con i dati rest
        if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
          const codiceSelezionato = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codiceProvincia;
          const provinciaSelezionata = this.listaProvince.filter(x => x.codice === codiceSelezionato)[0];
          this.formService.provincia.patchValue(provinciaSelezionata);
        }
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
          this.formService.appartenenza.patchValue('SI');
      } else {
        this.formService.appartenenza.patchValue('NO');
      }


    /**
     * Prende la provincia selezionata e gli passa l'id alla chiamata dei comuni per popolare il form con i dati già inseriti
     */
    this.formService.provincia.valueChanges
      .pipe(
        // Mi assicuro che il valore nel form sia valido
        filter(() => this.formService.provincia.value !== null && this.formService.provincia.value !== undefined),
        concatMap((provincia: Provincia) => this.rest.getComuni(provincia.codice))
      )
      .subscribe((comune: Comune[]) => {
        this.listaComuni = comune;
        this.formService.comune.patchValue('');

        this.log.debug(this.formService.comune);
        this.log.debug('cambiato');

        /* Se la domanda è stata già inviata, si fa un mapping per trovare il riferimento al corretto comune scelto*/
        if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
          const codComune = this.domandaService.domandaobj.domanda.invaliditaCivile.luogoRilascio.codice;
          const comuneSelezionato = this.listaComuni.filter(x => x.codice === codComune)[0];
          this.formService.comune.patchValue(comuneSelezionato);
        }

        this.detectionChange.markForCheck();
      });


    this.formService.appartenenza.valueChanges.subscribe((x) => {
      if (x === 'SI') {
        this.formService.percInvalidita.setValidators(
          [ Validators.required,
            Validators.max(100),
            Validators.min(1),
            CustomValidators.onlyNumber]);
        this.formService.dataCertificazione.setValidators(Validators.required);
        this.formService.invaliditaEnte.setValidators([Validators.required, Validators.maxLength(255)]);
        this.formService.comune.setValidators(Validators.required);
        this.formService.provincia.setValidators(Validators.required);

      } else if (x === 'NO') {
        this.formService.percInvalidita.clearValidators();
        this.formService.percInvalidita.reset();

        this.formService.dataCertificazione.clearValidators();
        this.formService.dataCertificazione.reset();

        this.formService.invaliditaEnte.clearValidators();
        this.formService.invaliditaEnte.reset();

        this.formService.comune.clearValidators();
        this.formService.comune.reset();

        this.formService.provincia.clearValidators();
        this.formService.provincia.reset();

        this.formService.ausiliProva.reset();
        this.formService.tempiAggiuntiviProva.reset();
        this.formService.esenzioneProvaSelettiva.reset();
      }

      this.formService.percInvalidita.updateValueAndValidity();
      this.formService.dataCertificazione.updateValueAndValidity();
      this.formService.invaliditaEnte.updateValueAndValidity();
      this.formService.comune.updateValueAndValidity();
      this.formService.provincia.updateValueAndValidity();
      this.formService.ausiliProva.updateValueAndValidity();
      this.formService.tempiAggiuntiviProva.updateValueAndValidity();
      this.formService.esenzioneProvaSelettiva.updateValueAndValidity();
    });
  }


  getSingleForm(id: string) {
    return this.formService.form.get('formCategorieProtette.' + id);
  }

}

