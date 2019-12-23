import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Subject} from 'rxjs';
import {concatMap, filter, map} from 'rxjs/operators';
import {
  Comune,
  Provincia,
  TipologiaTitoloStudio,
  TitoliTitoloIndirizzo,
  TitoliTitoloStudio
} from '../../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../../core/services/rest.service';
import {FormService} from '../../../../../core/services/form.service';
import {Logger} from '../../../../../core/services';
import {dataDropdown} from '../../../data-dropdown';
import {IntTipologiaOrTitoloOrIndirizzo} from '../../../../../core/models';


@Component({
  selector: 'step-istruzione',
  templateUrl: './step-istruzione.component.html',
  styleUrls: ['./step-istruzione.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepIstruzioneComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;

  altriIndirizziId = dataDropdown.altriIndirizziId;

  listaProvince: Provincia[];
  listaComuni: Comune[];
  listaTipologie: TipologiaTitoloStudio[];
  listaTitoli: TitoliTitoloStudio[];
  listaIndirizzi: TitoliTitoloIndirizzo[];


  renderTitoli = false;
  renderIndirizzi = false;
  renderAltroIndirizzo = false;
  renderComuni = false;

  log: Logger;


  constructor(private formbuilder: FormBuilder,
              private rest: RestService,
              private detectionChange: ChangeDetectorRef,
              private formService: FormService,
              private domandaService: DomandaService) {
    this.log = new Logger('Step-Istruzione');
  }

  ngOnInit() {


    /**
     * Prende la lista delle tipologie, se la domanda ha operazione = 1, allora fa il mapping e assegna il riferimento corretto
     */
    this.rest.getTipologiaTitoloStudio().subscribe(
      (data: TipologiaTitoloStudio[]) => {
        this.listaTipologie = data;
        // Se la domanda è stata già mi popolo la dropdown list con i dati rest
        if (this.domandaService.isEditable) {
          const tipologiaIst = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.tipologia.id;
          this.formService.patchFromObject(tipologiaIst, this.listaTipologie, this.formService.tipologia, 'id');
        }

      }
    );

    /**
     * Prende la lista delle province, se la domanda ha operazione = 1, allora fa il mapping e assegna il riferimento corretto
     */
    this.rest.getProvince().subscribe(
      (data: Provincia[]) => {
        this.listaProvince = data;
        if (this.domandaService.isEditable) {
          const codiceSelezionato = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codiceProvincia;
          this.formService.patchFromObject(codiceSelezionato, this.listaProvince, this.formService.provinciaIstituto, 'codice');
        }
      }
    );

  }


  ngOnChanges(changes: SimpleChanges): void {

    this.formService.tipologia.valueChanges.pipe(
      filter((x) => this.formService.tipologia.valid),
      map((tipologia: TipologiaTitoloStudio) => tipologia.id),
      concatMap(id => this.rest.getTitoliTitoloStudio(id))
    ).subscribe((data: TitoliTitoloStudio[]) => {

      // Se la tipologia cambia, annullo tutti i figli
      this.formService.titolo.patchValue('');
      this.formService.indirizzo.patchValue('');
      this.formService.altroIndirizzo.patchValue('');

      this.renderTitoli = false;
      this.renderIndirizzi = false;
      this.renderAltroIndirizzo = false;

      /**
       Se il servizio mi ritorna un array con dati allora titoli di studio deve essere popolato, se il servizio mi ritorna un array
       vuoto allora titoli di studio non deve essere popolato
       **/
      if (data.length > 0) {
        this.detectionChange.markForCheck();
        this.renderTitoli = true;

        this.formService.titolo.setValidators([Validators.required]);
        this.formService.titolo.updateValueAndValidity();

        this.listaTitoli = data;

        /** Se la domanda è stata inviata già mi popolo la dropdown list con i dati rest **/
        if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo !== null) {
          const tipologiaIst = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo.id;
          this.formService.patchFromObject(tipologiaIst, this.listaTitoli, this.formService.titolo, 'id');
        }
      }
    });

    this.formService.titolo.valueChanges.pipe(
      filter(() => this.formService.titolo.valid),
      map((titolo: TitoliTitoloIndirizzo) => titolo.id),
      concatMap(id => this.rest.getIndirizziTitoliStudio(id))
    ).subscribe((data: TitoliTitoloIndirizzo[]) => {

      // Se il titolo cambia, annullo tutti i figli
      this.formService.indirizzo.patchValue('');
      this.formService.altroIndirizzo.patchValue('');

      this.renderAltroIndirizzo = false;
      this.renderIndirizzi = false;

      /**
       Se il servizio mi ritorna un array con dati allora indirizzo di studio deve essere popolato, se il servizio mi ritorna un array
       vuoto allora indirizzo di studio non deve essere popolato
       **/
      if (data.length > 0) {
        this.renderIndirizzi = true;
        this.formService.indirizzo.setValidators([Validators.required]);

        this.listaIndirizzi = data;

        if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo !== null) {
          const indirizzo = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo.id;
          this.formService.patchFromObject(indirizzo, this.listaIndirizzi, this.formService.indirizzo, 'id');

        }
      }
      /** Se l'array non è popolato allora non vi sono indirizzi da scegliere **/
      if ( !(data.length > 0)) {
        this.renderIndirizzi = false;
        this.formService.indirizzo.patchValue(null);
        this.formService.indirizzo.clearValidators();
      }
      this.formService.indirizzo.updateValueAndValidity();
      this.detectionChange.markForCheck();
    });


    this.formService.indirizzo.valueChanges
      .pipe(
        filter(() => this.formService.indirizzo.value !== null),
        filter(() => this.formService.indirizzo.value !== undefined),
      )
      .subscribe(
        (data: IntTipologiaOrTitoloOrIndirizzo) => {


          // Se l'indirizzo cambia, annullo tutti i figli
          this.formService.altroIndirizzo.patchValue('');

          // Se è stato scelto ALTRO INDIRIZZO allora faccio inserire manualmente l'indirizzo
          /** Controllo se l'indirizzo scelto ha come id 351. L'id 351 equivale ad altro indirizzo, dunque renderizzo il form di
           * input per farlo inserire a mano **/


          if (data.desc === this.altriIndirizziId) {
            this.renderAltroIndirizzo = true;
            this.formService.altroIndirizzo.setValidators([Validators.required]);
            this.formService.altroIndirizzo.updateValueAndValidity();

            if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio !== null) {
              this.formService.altroIndirizzo
                .patchValue(this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio);
            }
          } else {
            this.renderAltroIndirizzo = false;
            this.formService.altroIndirizzo.setValidators([]);
            this.formService.altroIndirizzo.patchValue(null);
            this.formService.altroIndirizzo.updateValueAndValidity();
          }
          this.detectionChange.markForCheck();
        });


    this.formService.provinciaIstituto.valueChanges
      .pipe(
        filter(() => this.formService.provinciaIstituto.valid),
        concatMap((data: Provincia) => this.rest.getComuni(data.codice))
      )
      .subscribe((data: Comune[]) => {
        this.renderComuni = true;
        this.listaComuni = data;

        this.formService.comuneIstituto.patchValue('');
        this.formService.altroIndirizzo.updateValueAndValidity();

        if (this.domandaService.isEditable) {
          const codComune = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codice;
          this.formService.patchFromObject(codComune, this.listaComuni, this.formService.comuneIstituto, 'codice');

        }
        this.detectionChange.markForCheck();
      });

  }

  getSingleForm(id: string) {
    return this.form.get('formIstruzione.' + id);
  }


}
