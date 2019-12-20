import {Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSelect} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {concatMap, filter, map, take, takeUntil} from 'rxjs/operators';
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


@Component({
  selector: 'step-istruzione',
  templateUrl: './step-istruzione.component.html',
  styleUrls: ['./step-istruzione.component.scss'],
})
export class StepIstruzioneComponent implements OnInit, OnChanges, OnDestroy {

  @Input() form: FormGroup;

  @ViewChild('provinceSelect', { static: true }) provinceSelect: MatSelect;
  /** lista delle province filtrate dalla ricerca **/
  public filtroProvince: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  /** lista delle province **/
  listaProvince: Provincia[];

  @ViewChild('comuneSelect', { static: true }) comuneSelect: MatSelect;
  /** lista dei comuni filtrati dalla ricerca **/
  public filtroComuni: ReplaySubject<Comune[]> = new ReplaySubject<Comune[]>(1);
  /** lista dei comuni **/
  listaComuni: Comune[];

  @ViewChild('tipologiaSelect', { static: true }) tipologiaSelect: MatSelect;
  /** lista delle tipologie titoli di studio filtrate dalla ricerca **/
  public filtroTipologie: ReplaySubject<TipologiaTitoloStudio[]> = new ReplaySubject<TipologiaTitoloStudio[]>(1);
  /** lista delle tipologie titoli di studio **/
  listaTipologie: TipologiaTitoloStudio[];

  @ViewChild('titoliSelect', { static: false }) titoliSelect: MatSelect;
  /** lista dei titoli di studio filtrate dalla ricerca **/
  public filtroTitolo: ReplaySubject<TitoliTitoloStudio[]> = new ReplaySubject<TitoliTitoloStudio[]>(1);
  /** lista dei titoli di studio **/
  listaTitoli: TitoliTitoloStudio[];

  @ViewChild('indirizziSelect', { static: true }) indirizziSelect: MatSelect;
  /** lista degli indirizzi di studio filtrate dalla ricerca **/
  public filtroIndirizzi: ReplaySubject<TitoliTitoloIndirizzo[]> = new ReplaySubject<TitoliTitoloIndirizzo[]>(1);
  /** lista degli indirizzi di studio **/
  listaIndirizzi: TitoliTitoloIndirizzo[];

  renderTitoli = false;
  renderIndirizzi = false;
  renderAltroIndirizzo = false;

  log: Logger;

  /** Subject che viene emesse quando il component è distrutto */
  private onDetroy = new Subject<void>();

  constructor(private formbuilder: FormBuilder,
              private rest: RestService,
              private formService: FormService,
              private domandaService: DomandaService) {
    this.log = new Logger('Step-Istruzione');
  }

  ngOnInit() {

    this.log.debug(this.formService.comuneIstituto);


    /**
     * Prende la lista delle tipologie, se la domanda ha operazione = 1, allora fa il mapping e assegna il riferimento corretto
     */
    this.rest.getTipologiaTitoloStudio().subscribe(
      (data: TipologiaTitoloStudio[]) => {
        this.listaTipologie = data;
        this.filtroTipologie.next(this.listaTipologie.slice());
        this.setInitialTipologieValue(this.filtroTipologie);

        // Se la domanda è stata già mi popolo la dropdown list con i dati rest
        if (this.domandaService.isEditable) {
          const tipologiaIst = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.tipologia;
          const tipologiaSceltaId = this.listaTipologie
            .filter(selected => selected.id === tipologiaIst.id)[0];
          this.formService.tipologia.patchValue(tipologiaSceltaId);
        }
      }
    );

    /**
     * Prende la lista delle province, se la domanda ha operazione = 1, allora fa il mapping e assegna il riferimento corretto
     */
    this.rest.getProvince().subscribe(
      (data: Provincia[]) => {
        this.listaProvince = data;
        this.filtroProvince.next(this.listaProvince.slice());
        this.setInitialProvinceValue(this.filtroProvince);

        // Se la domanda è stata già mi popolo la dropdown list con i dati rest
        if (this.domandaService.isEditable) {
          const codiceSelezionato = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codiceProvincia;
          const provinciaSelezionata = this.listaProvince.filter(x => x.codice === codiceSelezionato)[0];
          this.formService.provinciaIstituto.patchValue(provinciaSelezionata);
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
        this.renderTitoli = true;

        this.formService.titolo.setValidators([Validators.required]);
        this.formService.titolo.updateValueAndValidity();

        this.listaTitoli = data;
        this.filtroTitolo.next(this.listaTitoli.slice());
        this.setInitialTitoliValue(this.filtroTitolo);

        /** Se la domanda è stata inviata già mi popolo la dropdown list con i dati rest **/
        if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo !== null) {
          const tipologiaIst = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo;
          const tipologiaSceltaId = this.listaTitoli
              .filter(selected => selected.id === tipologiaIst.id)[0];
          this.formService.titolo.patchValue(tipologiaSceltaId);
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
        this.filtroIndirizzi.next(this.listaIndirizzi.slice());
        this.setInitialIndirizziValue(this.filtroIndirizzi);

        if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo !== null) {
          const indirizzo = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo;

          const tipologiaSceltaId = this.listaIndirizzi
              .filter(selected => selected.id === indirizzo.id)[0];

          this.formService.indirizzo.patchValue(tipologiaSceltaId);
        }
      }
      /** Se l'array non è popolato allora non vi sono indirizzi da scegliere **/
      if ( !(data.length > 0)) {
        this.renderIndirizzi = false;
        this.formService.indirizzo.patchValue(null);
        this.formService.indirizzo.clearValidators();
      }
      this.formService.indirizzo.updateValueAndValidity();
    });


    this.formService.indirizzo.valueChanges
      .pipe(
        filter(() => this.formService.indirizzo.value !== null),
      )
      .subscribe(
        (data) => {

          // Se l'indirizzo cambia, annullo tutti i figli
          this.formService.altroIndirizzo.patchValue('');

          // Se è stato scelto ALTRO INDIRIZZO allora faccio inserire manualmente l'indirizzo
          /** Controllo se l'indirizzo scelto ha come id 341. L'id 341 equivale ad altro indirizzo, dunque renderizzo il form di
           * input per farlo inserire a mano **/
          if (data.id === '341') {
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
        });


    this.formService.provinciaIstituto.valueChanges
      .pipe(
        filter(() => this.formService.provinciaIstituto.valid),
        concatMap((data: Provincia) => this.rest.getComuni(data.codice))
      )
      .subscribe((data: Comune[]) => {

        this.formService.comuneIstituto.patchValue('');

        this.listaComuni = data;
        this.filtroComuni.next(this.listaComuni.slice());
        this.setInitialComuneValue(this.filtroComuni);


        if (this.domandaService.isEditable) {
          const codComune = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codice;
          const comuneSelezionato = this.listaComuni.filter(x => x.codice === codComune)[0];

          this.formService.comuneIstituto.patchValue(comuneSelezionato);
        }


        this.log.debug(this.formService.comuneIstituto);

      });


    /*
      I seguenti valueChanges analizzano i cambiamenti del testo nel campo di ricerca del dropdown search dei delle dropdown list
     */
    this.formService.comuniDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicerca(this.listaComuni, this.formService.comuniDropdown, this.filtroComuni);
      });

    this.formService.provinceDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicerca(this.listaProvince, this.formService.provinceDropdown, this.filtroProvince);
      });

    this.formService.tipologiaDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe((x) => {
        this.filtraRicercaIstruzione(this.listaTipologie, this.formService.tipologiaDropdown, this.filtroTipologie);
      });

    this.formService.titoloDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicercaIstruzione(this.listaTitoli, this.formService.titoloDropdown, this.filtroTitolo);
      });

    this.formService.indirizzoDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicercaIstruzione(this.listaIndirizzi, this.formService.indirizzoDropdown, this.filtroIndirizzi);
      });


  }

  /*
    Popola gli array con i dati iniziali
   */

  private setInitialTipologieValue(data: Observable<TipologiaTitoloStudio[]>) {
    data
      .pipe(
        filter(() => this.tipologiaSelect !== undefined),
        take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
          this.tipologiaSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  private setInitialTitoliValue(data: Observable<TitoliTitoloStudio[]>) {
    data
      .pipe(
        filter(() => this.titoliSelect !== undefined),
        take(1),
        takeUntil(this.onDetroy))
      .subscribe(() => {
          this.titoliSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  private setInitialIndirizziValue(data: Observable<TitoliTitoloIndirizzo[]>) {
    data
      .pipe(
        filter(() => this.indirizziSelect !== undefined),
        take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
          this.indirizziSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  private setInitialProvinceValue(data: Observable<Provincia[]> ) {
    data
      .pipe(
        take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
        this.provinceSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  private setInitialComuneValue(data: Observable<Comune[]>) {
    data
      .pipe(take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        if (this.comuneSelect) {
          this.comuneSelect.compareWith = (a: string, b: string) => a && b && a === b;
        }
      });
  }

    /*
     Filtra i risultati delle dropdown list in base all'input
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

  private filtraRicercaIstruzione(data: (TitoliTitoloIndirizzo[] | TipologiaTitoloStudio[] | TitoliTitoloIndirizzo[]), form, filters) {
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
      data.filter(nm => nm.desc.toLocaleLowerCase().indexOf(search) > -1)
    );
  }


  ngOnDestroy() {
    this.onDetroy.next();
    this.onDetroy.complete();
  }

  // Se il form è valido permette di andare avanti al prossimo step
  allowNextStep() {
    return !this.form.controls.formIstruzione.valid;
  }

  getSingleForm(id: string) {
    return this.form.get('formIstruzione.' + id);
  }

}
