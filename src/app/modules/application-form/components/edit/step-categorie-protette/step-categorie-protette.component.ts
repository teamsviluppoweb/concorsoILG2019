import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatSelect, MatStepper} from '@angular/material';
import {CustomValidators} from '../../../../../shared/validators/customValidators';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Comune, Provincia} from '../../../../../core/models/rest/rest-interface';
import {concatMap, filter, take, takeUntil} from 'rxjs/operators';
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
})
export class StepCategorieProtetteComponent implements OnInit, OnDestroy, OnChanges {
  @Input() form: FormGroup;

  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  @ViewChild('provinceInvSelect', { static: true }) provinceInvSelect: MatSelect;
  /** lista delle province filtrate dalla ricerca **/
  public filtroProvince: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  /** lista delle province **/
  listaProvince: Provincia[];

  @ViewChild('comuneInvSelect', { static: true }) comuneInvSelect: MatSelect;
  /** lista dei comuni filtrate dalla ricerca **/
  public filtroComuni: ReplaySubject<Comune[]> = new ReplaySubject<Comune[]>(1);
  /** lista dei comuni **/
  listaComuni: Comune[];

  /** Subject che viene emesse quando il component è distrutto */
  private onDetroy = new Subject<void>();

  log: Logger;

  constructor(private domandaService: DomandaService,
              private formService: FormService,
              private rest: RestService) {
    this.log = new Logger('Step Categorie Protette');
  }

  ngOnInit(): void {

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
        this.filtroProvince.next(this.listaProvince.slice());
        this.setInitialProvinceValue(this.filtroProvince);

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
        this.formService.comune.patchValue('');
        this.listaComuni = comune;
        this.filtroComuni.next(this.listaComuni.slice());
        this.formService.comune.patchValue('');

        this.log.debug(this.formService.comune);

        /* Se la domanda è stata già inviata, si fa un mapping per trovare il riferimento al corretto comune scelto*/
        if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
          const codComune = this.domandaService.domandaobj.domanda.invaliditaCivile.luogoRilascio.codice;
          const comuneSelezionato = this.listaComuni.filter(x => x.codice === codComune)[0];
          this.formService.comune.patchValue(comuneSelezionato);
        }
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
      }

      this.formService.percInvalidita.updateValueAndValidity();
      this.formService.dataCertificazione.updateValueAndValidity();
      this.formService.invaliditaEnte.updateValueAndValidity();
      this.formService.comune.updateValueAndValidity();
      this.formService.provincia.updateValueAndValidity();

    });


    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search dei comuni
    this.formService.comuniDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicerca(this.listaComuni, this.formService.comuniDropdownCat, this.filtroComuni);
      });

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search delle province
    this.formService.provinceDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicerca(this.listaProvince, this.formService.provinceDropdownCat, this.filtroProvince);
      });
  }



  /**
   * Popola la dropdown delle province
   * @param data = La lista delle province in formato observable
   */
  private setInitialProvinceValue(data: Observable<Provincia[]> ) {
    data
      .pipe(
        filter(() => this.provinceInvSelect !== undefined),
        take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
          this.provinceInvSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  /**
   * Popola la dropdown dei comuni
   * @param data = La lista dei comuni in formato observable
   */
  private setInitialComuneValue(data: Observable<Comune[]>) {
    data
      .pipe(
        filter(() => this.comuneInvSelect !== undefined),
        take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
          this.comuneInvSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  ngOnDestroy() {
    this.onDetroy.next();
    this.onDetroy.complete();
  }


  /**
   * Durante l'input nella filter list, si occupa di filtrare i dati
   * @param data = La lista dei comuni o province in formato observable
   * @param form = Il formcontrol della dropdown list
   * @param filters = Il replay subject creato per il filtro della lista
   */
  private filtraRicerca(data: (Provincia[] | Comune[]), form, filters) {
    if (!data) {
      return;
    }
    // ottiene la keyword di ricerca
    let search = form.value;
    if (!search) {
      filters.next(data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // Filtra le province
    filters.next(
      data.filter(nm => nm.nome.toLocaleLowerCase().indexOf(search) > -1)
    );
  }

  /* Controlla se il formgroup ha lo stato valido */
  allowNextStep() {
    return !this.formService.form.controls.formCategorieProtette.valid;
  }

  getSingleForm(id: string) {
    return this.formService.form.get('formCategorieProtette.' + id);
  }

}

