import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatSelect, MatStepper} from '@angular/material';
import {CustomValidators} from '../../../../../shared/validators/customValidators';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Comune, Provincia} from '../../../../../core/models/rest/rest-interface';
import {concatMap, filter, take, takeUntil} from 'rxjs/operators';
import {RestService} from '../../../../../core/services/rest.service';
import {IntComuneNascitaOrLuogoIstituto, IntInvaliditaCivile} from '../../../../../core/models';

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

  @ViewChild('provinceInvSelect', { static: true }) provinceInvSelect: MatSelect;
  public filtroProvince: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  listaProvince: Provincia[];

  @ViewChild('comuneInvSelect', { static: true }) comuneInvSelect: MatSelect;
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

        if (this.domandaService.domandaobj.domanda.stato ==  1) {
          const codiceProvincia = this.domandaService.domandaobj.domanda.invaliditaCivile.luogoRilascio.codiceProvincia;
          let prov;
          const c = this.listaProvince.forEach( x => {
            if (codiceProvincia === x.codice) {
              prov = x;
              this.provincia.patchValue(prov);
            }
            return;
          });
        }

      }
    );

    if (this.domandaService.domandaobj.domanda.stato === 1) {
      if (this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
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
        filter(() => this.provincia.value !== null),
        concatMap((data: Provincia) => this.rest.getComuni(data.codice))
      )
      .subscribe((data: Comune[]) => {
        this.listaComuni = data;
        this.filtroComuni.next(this.listaComuni.slice());
        this.setInitialComuneValue(this.filtroComuni);

        if (this.domandaService.domandaobj.domanda.stato ===  1) {
          const codComune = this.domandaService.domandaobj.domanda.invaliditaCivile.luogoRilascio.codice;
          let com;
          const c = this.listaComuni.forEach( x => {
            if (codComune === x.codice) {
              com = x;
              this.comune.patchValue(com);
            }
            return;
          });
        }

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


    this.comune.valueChanges
      .pipe(
        filter(() => this.comune.valid)
      ).subscribe( (data) => {
      if (data !== undefined && data !== null) {
        this.domandaService.domandaobj.domanda.invaliditaCivile.luogoRilascio.codice = data.codice;
        this.domandaService.domandaobj.domanda.invaliditaCivile.luogoRilascio.nome = data.nome;
        this.domandaService.domandaobj.domanda.invaliditaCivile.luogoRilascio.codiceProvincia = this.provincia.value.codice;
      }
    });

    this.appartenenza.valueChanges.subscribe((x) => {

      if (x === 'SI') {
        this.percInvalidita.setValidators([Validators.required, Validators.max(100), Validators.min(1), CustomValidators.onlyNumber]);
        this.dataCertificazione.setValidators(Validators.required);
        this.invaliditaEnte.setValidators([Validators.required, Validators.maxLength(255)]);
        this.comune.setValidators(Validators.required);
        this.provincia.setValidators(Validators.required);
        const luogo: IntComuneNascitaOrLuogoIstituto = {
          codice: '',
          nome: '',
          codiceProvincia: ''
        };

        const inv: IntInvaliditaCivile = {
          luogoRilascio: luogo,
          dataCertificazione: '',
          percentuale: 0,
          enteCertificatore: '',
          ausili: false,
          esenteProvaPreselettiva: false,
          tempiAggiuntivi: false
        };
        this.domandaService.domandaobj.domanda.invaliditaCivile = inv;
      } else if (x === 'NO') {
        this.percInvalidita.clearValidators();
        this.percInvalidita.reset();

        this.dataCertificazione.clearValidators();
        this.dataCertificazione.reset();

        this.invaliditaEnte.clearValidators();
        this.invaliditaEnte.reset();

        this.comune.clearValidators();
        this.comune.reset();

        this.provincia.clearValidators();
        this.provincia.reset();

        this.domandaService.domandaobj.domanda.invaliditaCivile = null;
      }

      this.percInvalidita.updateValueAndValidity();
      this.dataCertificazione.updateValueAndValidity();
      this.invaliditaEnte.updateValueAndValidity();
      this.comune.updateValueAndValidity();
      this.provincia.updateValueAndValidity();

    });

    this.dataCertificazione.valueChanges
      .pipe(
        filter(() => this.dataCertificazione.valid)
      )
      .subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.dataCertificazione = x;
        }
      }
    );

    this.ausiliProva.valueChanges
      .pipe(
        filter(() => this.ausiliProva.valid)
      )
      .subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.ausili = x;
        }
      }
    );

    this.invaliditaEnte.valueChanges
      .pipe(
        filter(() => this.invaliditaEnte.valid)
      )
      .subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.enteCertificatore = x;
        }
      }
    );
    this.esenzioneProvaSelettiva.valueChanges
      .pipe(
        filter(() => this.esenzioneProvaSelettiva.valid)
      )
      .subscribe(
      (x) => {
        if (x !== '') {
          this.domandaService.domandaobj.domanda.invaliditaCivile.esenteProvaPreselettiva = x;
        }
      }
    );

    this.percInvalidita.valueChanges
      .pipe(
        filter(() => this.percInvalidita.valid)
      )
      .subscribe(
      (x) => {
        if (x !== undefined) {
          this.domandaService.domandaobj.domanda.invaliditaCivile.percentuale = x;
        }
      }
    );

    this.tempiAggiuntiviProva.valueChanges
      .pipe(
        filter(() => this.tempiAggiuntiviProva.valid)
      )
      .subscribe(
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
        if (this.provinceInvSelect) {
          this.provinceInvSelect.compareWith = (a: string, b: string) => a && b && a === b;
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
        if (this.comuneInvSelect) {
          this.comuneInvSelect.compareWith = (a: string, b: string) => a && b && a === b;
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

