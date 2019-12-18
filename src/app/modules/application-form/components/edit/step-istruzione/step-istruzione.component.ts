import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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


/* ## Disabilita il required di istruzione */
/*
  for (const key in this.parent['controls'].formIstruzione['controls']) {
  this.parent.get('formIstruzione.' + key).clearValidators();
  this.parent.get('formIstruzione.' + key).updateValueAndValidity();
}
 */



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-istruzione',
  templateUrl: './step-istruzione.component.html',
  styleUrls: ['./step-istruzione.component.scss'],
})
export class StepIstruzioneComponent implements OnInit, OnChanges, OnDestroy {

  @Input() parent: FormGroup;

  @ViewChild('provinceSelect', { static: true }) provinceSelect: MatSelect;
  public filtroProvince: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  listaProvince: Provincia[];

  @ViewChild('comuneSelect', { static: true }) comuneSelect: MatSelect;
  public filtroComuni: ReplaySubject<Comune[]> = new ReplaySubject<Comune[]>(1);
  listaComuni: Comune[];

  @ViewChild('tipologiaSelect', { static: true }) tipologiaSelect: MatSelect;
  public filtroTipologie: ReplaySubject<TipologiaTitoloStudio[]> = new ReplaySubject<TipologiaTitoloStudio[]>(1);
  listaTipologie: TipologiaTitoloStudio[];

  @ViewChild('titoliSelect', { static: false }) titoliSelect: MatSelect;
  public filtroTitolo: ReplaySubject<TitoliTitoloStudio[]> = new ReplaySubject<TitoliTitoloStudio[]>(1);
  listaTitoli: TitoliTitoloStudio[];

  @ViewChild('indirizziSelect', { static: true }) indirizziSelect: MatSelect;
  public filtroIndirizzi: ReplaySubject<TitoliTitoloIndirizzo[]> = new ReplaySubject<TitoliTitoloIndirizzo[]>(1);
  listaIndirizzi: TitoliTitoloIndirizzo[];

  displayTitoli = false;
  displayIndirizzi = false;
  displayAltroIndirizzo = false;
  isDomandaInvita: boolean;

  private onDetroy = new Subject<void>();

  constructor(private formbuilder: FormBuilder,
              private rest: RestService,
              private formService: FormService,
              private domandaService: DomandaService) {}

  ngOnInit() {
    this.isDomandaInvita = this.domandaService.domandaobj.operazione ===  1;

    this.rest.getTipologiaTitoloStudio().subscribe(
      (data: TipologiaTitoloStudio[]) => {
        this.listaTipologie = data;
        this.filtroTipologie.next(this.listaTipologie.slice());
        this.setInitialTipologieValue(this.filtroTipologie);

        // Se la domanda è stata già mi popolo la dropdown list con i dati rest
        if (this.isDomandaInvita) {
          const tipologiaIst = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.tipologia;
          const tipologiaSceltaId = this.listaTipologie
            .filter(selected => selected.id === tipologiaIst.id)
            .map(selected => selected)
            .reduce(selected => selected);
          this.formService.tipologia.patchValue(tipologiaSceltaId);
        }
      }
    );

    this.rest.getProvince().subscribe(
      (data: Provincia[]) => {
        this.listaProvince = data;
        this.filtroProvince.next(this.listaProvince.slice());
        this.setInitialProvinceValue(this.filtroProvince);

        // Se la domanda è stata già mi popolo la dropdown list con i dati rest
        if (this.isDomandaInvita) {
          const codiceSelezionato = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codiceProvincia;
          const provinciaSelezionata = this.listaProvince.filter(x => x.codice === codiceSelezionato).map(x => x).reduce(x => x);
          this.formService.provinciaIstituto.patchValue(provinciaSelezionata);
        }
      }
    );

  }


  // I form sono posizionati in ngOnChanges in modo da farli sempre restare in ascolt0 anche nel routing change
  ngOnChanges(changes: SimpleChanges): void {

    this.formService.tipologia.valueChanges.pipe(
      filter((x) => this.formService.tipologia.valid),
      map((tipologia: TipologiaTitoloStudio) => tipologia.id),
      concatMap(id => this.rest.getTitoliTitoloStudio(id))
    ).subscribe((data: TitoliTitoloStudio[]) => {

      // Se la tipologia cambia, non ha senso mostrare ancora gli indirizzi
      this.displayIndirizzi = false;

      if (data.length > 0) {
        this.displayTitoli = true;

        this.formService.titolo.setValidators([Validators.required]);
        this.formService.titolo.updateValueAndValidity();

        this.listaTitoli = data;
        this.filtroTitolo.next(this.listaTitoli.slice());
        this.setInitialTitoliValue(this.filtroTitolo);

        // Se la domanda è stata già mi popolo la dropdown list con i dati rest
        if (this.isDomandaInvita && this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo !== null) {
          const tipologiaIst = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo;
          const tipologiaSceltaId = this.listaTitoli
              .filter(selected => selected.id === tipologiaIst.id)
              .map(selected => selected)
              .reduce(selected => selected);

          this.formService.titolo.patchValue(tipologiaSceltaId);
        }
      }
    });

    this.formService.titolo.valueChanges.pipe(
      filter(() => this.formService.titolo.valid),
      map((titolo: TitoliTitoloIndirizzo) => titolo.id),
      concatMap(id => this.rest.getIndirizziTitoliStudio(id))
    ).subscribe((data: TitoliTitoloIndirizzo[]) => {

      if (data.length > 0) {
        this.displayIndirizzi = true;
        this.formService.indirizzo.setValidators([Validators.required]);

        this.listaIndirizzi = data;
        this.filtroIndirizzi.next(this.listaIndirizzi.slice());
        this.setInitialIndirizziValue(this.filtroIndirizzi);

        if (this.isDomandaInvita && this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo !== null) {
          const indirizzo = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo;

          const tipologiaSceltaId = this.listaIndirizzi
              .filter(selected => selected.id === indirizzo.id)
              .map(selected => selected)
              .reduce(selected => selected);

          this.formService.indirizzo.patchValue(tipologiaSceltaId);
        }
      }
      // Se l'array non è popolato allora non vi sono indirizzi da scegliere
      if ( !(data.length > 0)) {
        this.displayIndirizzi = false;
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
          // Se è stato scelto ALTRO INDIRIZZO allora faccio inserire manualmente l'indirizzo
          console.log(data.id);
          if (data.id === '341') {
            this.displayAltroIndirizzo = true;
            this.formService.altroIndirizzo.setValidators([Validators.required]);
            this.formService.altroIndirizzo.updateValueAndValidity();

            if (this.isDomandaInvita && this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio !== null) {
              this.formService.altroIndirizzo.patchValue(this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio);
            }
          } else {
            this.displayAltroIndirizzo = false;
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
        this.listaComuni = data;
        this.filtroComuni.next(this.listaComuni.slice());
        this.setInitialComuneValue(this.filtroComuni);

        if (this.isDomandaInvita) {
          const codComune = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codice;
          const comuneSelezionato = this.listaComuni.filter(x => x.codice === codComune).map(x => x).reduce(x => x);
          this.formService.comuneIstituto.patchValue(comuneSelezionato);
        }
      });


    /*
      Analizza i cambiamenti del testo nel campo di ricerca del dropdown search dei delle dropdown list
     */
    this.formService.comuniDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicerca(this.listaComuni, this.formService.comuniDropdown, this.filtroComuni);
      });

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search delle province
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
    return !this.parent.controls.formIstruzione.valid;
  }


  getSingleForm(id: string) {
    return this.parent.get('formIstruzione.' + id);
  }




}
