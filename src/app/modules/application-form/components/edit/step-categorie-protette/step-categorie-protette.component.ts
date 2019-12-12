import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatSelect, MatStepper} from '@angular/material';
import {CustomValidators} from '../../../../../shared/validators/customValidators';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Comune, Provincia} from '../../../../../core/models/rest/rest-interface';
import {concatMap, filter, take, takeUntil} from 'rxjs/operators';
import {RestService} from '../../../../../core/services/rest.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-categorie-protette',
  templateUrl: './step-categorie-protette.component.html',
  styleUrls: ['./step-categorie-protette.component.scss']
})
export class StepCategorieProtetteComponent implements OnInit, OnDestroy {

  @Input() parent: FormGroup;
  maxDateDataCertificazione = new Date(Date.now());
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  @ViewChild('provinceSelect', { static: true }) provinceSelect: MatSelect;
  public filtroProvince: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  listaProvince: Provincia[];

  @ViewChild('comuneSelect', { static: true }) comuneSelect: MatSelect;
  public filtroComuni: ReplaySubject<Comune[]> = new ReplaySubject<Comune[]>(1);
  listaComuni: Comune[];


  private onDetroy = new Subject<void>();

  constructor(private domandaService: DomandaService, private rest: RestService) {
  }

  ngOnInit() {

    this.rest.getProvince().subscribe(
      (data: Provincia[]) => {
        this.listaProvince = data;
        this.filtroProvince.next(this.listaProvince.slice());
        this.setInitialProvinceValue(this.filtroProvince);
      }
    );

    if (this.domandaService.domandaobj.domanda.stato === 1) {
      if (this.domandaService.domandaobj.domanda.invaliditaCivile.percentuale) {
        this.appartenenza.patchValue('SI');

        const inv = this.domandaService.domandaobj.domanda.invaliditaCivile;

        this.ausiliProva.patchValue(inv.ausili);
        this.dataCertificazione.patchValue(inv.dataCertificazione);
        this.invaliditaEnte.patchValue(inv.enteCertificatore);
        this.esenzioneProvaSelettiva.patchValue(inv.esenteProvaPreselettiva);
        this.percInvalidita.patchValue(inv.percentuale);
        this.tempiAggiuntiviProva.patchValue(inv.tempiAggiuntivi);

      } else {
        this.appartenenza.patchValue('NO');
      }
    }

    this.comune.valueChanges.subscribe( (data) => {
    });

    this.provincia.valueChanges
      .pipe(
        // Mi assicuro che il valore nel form sia valido
        filter(() => this.provincia.valid),
        concatMap((data: Provincia) => this.rest.getComuni(data.codice))
      )
      .subscribe((data: Comune[]) => {
        this.listaComuni = data;
        this.filtroComuni.next(this.listaComuni.slice());
        this.setInitialComuneValue(this.filtroComuni);
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

    this.onChanges();
  }

  onChanges() {



    this.appartenenza.valueChanges.subscribe((x) => {

      if (x === 'SI') {
        this.percInvalidita.setValidators([Validators.required, Validators.max(100), Validators.min(1), CustomValidators.onlyNumber]);
        this.dataCertificazione.setValidators(Validators.required);
        this.invaliditaEnte.setValidators([Validators.required, Validators.maxLength(255)]);
      } else if (x === 'NO') {
        this.percInvalidita.clearValidators();
        this.percInvalidita.reset();

        this.dataCertificazione.clearValidators();
        this.dataCertificazione.reset();

        this.invaliditaEnte.clearValidators();
        this.invaliditaEnte.reset();
      }

      this.percInvalidita.updateValueAndValidity();
      this.dataCertificazione.updateValueAndValidity();
      this.invaliditaEnte.updateValueAndValidity();

    });

    this.dataCertificazione.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.dataCertificazione = x;
        }
      }
    );

    this.ausiliProva.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.ausili = x;
        }
      }
    );

    this.invaliditaEnte.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.enteCertificatore = x;
        }
      }
    );
    this.esenzioneProvaSelettiva.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.esenteProvaPreselettiva = x;
        }
      }
    );

    this.percInvalidita.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.percentuale = x;
        }
      }
    );

    this.tempiAggiuntiviProva.valueChanges.subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.tempiAggiuntivi = x;
        }
      }
    );

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
        if (this.provinceSelect) {
          this.provinceSelect.compareWith = (a: string, b: string) => a && b && a === b;
        }
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

  ngOnDestroy() {
    this.onDetroy.next();
    this.onDetroy.complete();
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

  get appartenenza() {
    return this.parent.get('formCategorieProtette.appartenenza');
  }

  get percInvalidita() {
    return this.parent.get('formCategorieProtette.percInvalidita');
  }

  get dataCertificazione() {
    return this.parent.get('formCategorieProtette.dataCertificazione');
  }

  get invaliditaEnte() {
    return this.parent.get('formCategorieProtette.invaliditaEnte');
  }

  get ausiliProva() {
    return this.parent.get('formCategorieProtette.ausiliProva');
  }

  get tempiAggiuntiviProva() {
    return this.parent.get('formCategorieProtette.tempiAggiuntiviProva');
  }

  get esenzioneProvaSelettiva() {
    return this.parent.get('formCategorieProtette.esenzioneProvaSelettiva');
  }


  // DROPDOWN

  get comune() {
    return this.parent.get('formCategorieProtette.comune');
  }

  get comuniDropdown() {
    return this.parent.get('formCategorieProtette.comuniDropdown');
  }

  get provincia() {
    return this.parent.get('formCategorieProtette.provincia');
  }

  get provinceDropdown() {
    return this.parent.get('formCategorieProtette.provinceDropdown');
  }


}

