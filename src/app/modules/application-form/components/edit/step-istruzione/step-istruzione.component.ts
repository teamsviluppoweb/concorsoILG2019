import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSelect} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {concatMap, filter, map, take, takeUntil, tap} from 'rxjs/operators';
import {
  Comune,
  Provincia,
  TipologiaTitoloStudio,
  TitoliTitoloIndirizzo,
  TitoliTitoloStudio
} from '../../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../../core/services/rest.service';

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
export class StepIstruzioneComponent implements OnInit, OnDestroy {

  @Input() parent: FormGroup;
  displayTitoli = false;
  displayIndirizzi = false;


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


  private onDetroy = new Subject<void>();


  constructor(private formbuilder: FormBuilder,
              private rest: RestService,
              private domandaService: DomandaService) {}


  ngOnInit() {

    this.rest.getTipologiaTitoloStudio().subscribe(
      (data: TipologiaTitoloStudio[]) => {
        this.listaTipologie = data;
        this.filtroTipologie.next(this.listaTipologie.slice());
        this.setInitialTipologieValue(this.filtroTipologie);
      }
     );

    this.rest.getProvince().subscribe(
        (data: Provincia[]) => {
           this.listaProvince = data;
           this.filtroProvince.next(this.listaProvince.slice());
           this.setInitialProvinceValue(this.filtroProvince);
        }
      );

    this.onChanges();
  }

  onChanges() {


    this.tipologia.valueChanges.subscribe(
      (data: TipologiaTitoloStudio) => this.domandaService.domandaobj.domanda.titoloStudioPosseduto.tipologia = data);

    this.titolo.valueChanges.subscribe(
      (data) => this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo = data);

    this.indirizzo.valueChanges.subscribe(
      (data) => this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo = data);

    this.dataConseguimento.valueChanges.subscribe(
      (data) => this.domandaService.domandaobj.domanda.titoloStudioPosseduto.dataConseguimento = data);

    this.nomeIstituto.valueChanges.subscribe(data => this.domandaService.domandaobj.domanda.titoloStudioPosseduto.istituto = data);

    this.indirizzoFisico.valueChanges.subscribe((data) => this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzoIstituto = data);

    this.comuneIstituto.valueChanges.subscribe( (data) => {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codice = data.codice;
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.nome = data.nome;
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codiceProvincia = this.provinciaIstituto.value.codice;
    });

    this.provinciaIstituto.valueChanges
      .pipe(
        // Mi assicuro che il valore nel form sia valido
        filter(() => this.provinciaIstituto.valid),
        concatMap((data: Provincia) => this.rest.getComuni(data.codice))
      )
      .subscribe((data: Comune[]) => {
        this.listaComuni = data;
        this.filtroComuni.next(this.listaComuni.slice());
        console.log(this.listaComuni);
        this.setInitialComuneValue(this.filtroComuni);
      });


    this.tipologia.valueChanges.pipe(
      filter(() => this.tipologia.valid),
      map((tipologia: TipologiaTitoloStudio) => tipologia.id),
      tap((x) =>  console.log(x)),
      concatMap(id => this.rest.getTitoliTitoloStudio(id))
    ).subscribe((data: TitoliTitoloStudio[]) => {



      if (data.length > 0) {
        this.displayTitoli = true;


        this.titolo.setValidators(Validators.required);
        this.listaTitoli = data;
        this.filtroTitolo.next(this.listaTitoli.slice());
        this.setInitialTitoliValue(this.filtroTitolo);

      } else {
        this.displayTitoli = false;
        this.titolo.clearValidators();
      }

      this.titolo.updateValueAndValidity();
    });

    this.titolo.valueChanges.pipe(
      filter(() => this.titolo.valid),
      map((titolo: TitoliTitoloIndirizzo) => titolo.id),
      concatMap(id => this.rest.getIndirizziTitoliStudio(id))
    ).subscribe((data: TitoliTitoloIndirizzo[]) => {

      if (data.length > 0) {
        this.displayIndirizzi = true;
        this.indirizzo.setValidators(Validators.required);

        this.listaIndirizzi = data;
        this.filtroIndirizzi.next(this.listaIndirizzi.slice());
        this.setInitialIndirizziValue(this.filtroIndirizzi);

      } else {
        this.displayIndirizzi = false;
        this.indirizzo.clearValidators();
      }

      this.indirizzo.updateValueAndValidity();


    });

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search dei comuni
    this.comuniDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicerca(this.listaComuni, this.comuniDropdown, this.filtroComuni);
      });

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search delle province
    this.provinceDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicerca(this.listaProvince, this.provinceDropdown, this.filtroProvince);
      });

    this.tipologiaDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicercaIstruzione(this.listaTipologie, this.tipologiaDropdown, this.filtroTipologie);
      });

    this.titoloDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicercaIstruzione(this.listaTitoli, this.titoloDropdown, this.filtroTitolo);
      });

    this.indirizzoDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicercaIstruzione(this.listaIndirizzi, this.indirizzoDropdown, this.filtroIndirizzi);
      });

  }

  private setInitialTipologieValue(data: Observable<TipologiaTitoloStudio[]>) {
    data
      .pipe(
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
      .pipe(take(1),
        takeUntil(this.onDetroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.titoliSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  private setInitialIndirizziValue(data: Observable<TitoliTitoloIndirizzo[]>) {
    data
      .pipe(take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.indirizziSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  private setInitialProvinceValue(data: Observable<Provincia[]> ) {
    data
      .pipe(take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
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
        this.comuneSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }


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



  get tipologia() {
    return this.parent.get('formIstruzione.tipologia');
  }

  get titolo() {
    return this.parent.get('formIstruzione.titolo');
  }

  get indirizzo() {
    return this.parent.get('formIstruzione.indirizzo');
  }

  get dataConseguimento() {
    return this.parent.get('formIstruzione.dataConseguimento');
  }

  get nomeIstituto() {
    return this.parent.get('formIstruzione.nomeIstituto');
  }

  get indirizzoFisico() {
    return this.parent.get('formIstruzione.indirizzoFisico');
  }


  // DROPDOWN

  get provinciaIstituto() {
    return this.parent.get('formIstruzione.provinciaIstituto');
  }

  get comuneIstituto() {
    return this.parent.get('formIstruzione.comuneIstituto');
  }

  get comuniDropdown() {
    return this.parent.get('formIstruzione.comuniDropdown');
  }

  get provinceDropdown() {
    return this.parent.get('formIstruzione.provinceDropdown');
  }

  get tipologiaDropdown() {
    return this.parent.get('formIstruzione.tipologiaDropdown');
  }

  get titoloDropdown() {
    return this.parent.get('formIstruzione.titoloDropdown');
  }

  get indirizzoDropdown() {
    return this.parent.get('formIstruzione.indirizzoDropdown');
  }


  allowNextStep() {
    return !this.parent.controls.formIstruzione.valid;
  }
}
