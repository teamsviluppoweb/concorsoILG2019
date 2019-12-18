import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatSelect, MatStepper} from '@angular/material';
import {CustomValidators} from '../../../../../shared/validators/customValidators';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {Comune, Provincia} from '../../../../../core/models/rest/rest-interface';
import {concatMap, filter, take, takeUntil} from 'rxjs/operators';
import {RestService} from '../../../../../core/services/rest.service';
import {IntInvaliditaCivile} from '../../../../../core/models';
import {FormService} from '../../../../../core/services/form.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-categorie-protette',
  templateUrl: './step-categorie-protette.component.html',
  styleUrls: ['./step-categorie-protette.component.scss'],
})
export class StepCategorieProtetteComponent implements OnInit, OnDestroy, OnChanges {

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

  constructor(private domandaService: DomandaService,
              private formService: FormService,
              private rest: RestService) {
  }

  ngOnInit(): void {

    this.rest.getProvince().subscribe(
      (data: Provincia[]) => {
        this.listaProvince = data;
        this.filtroProvince.next(this.listaProvince.slice());
        this.setInitialProvinceValue(this.filtroProvince);

        // Se la domanda è stata già mi popolo la dropdown list con i dati rest
        if (this.domandaService.isEditable) {
          const codiceSelezionato = this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto.codiceProvincia;
          const provinciaSelezionata = this.listaProvince.filter(x => x.codice === codiceSelezionato).map(x => x).reduce(x => x);
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


    this.formService.provincia.valueChanges
      .pipe(
        // Mi assicuro che il valore nel form sia valido
        filter(() => this.formService.provincia.value !== null && this.formService.provincia.value !== undefined),
        concatMap((data: Provincia) => this.rest.getComuni(data.codice))
      )
      .subscribe((data: Comune[]) => {
        this.listaComuni = data;
        this.filtroComuni.next(this.listaComuni.slice());
        this.setInitialComuneValue(this.filtroComuni);

        if (this.domandaService.isEditable && this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
          const codComune = this.domandaService.domandaobj.domanda.invaliditaCivile.luogoRilascio.codice;
          const comuneSelezionato = this.listaComuni.filter(x => x.codice === codComune).map(x => x).reduce(x => x);
          this.formService.comune.patchValue(comuneSelezionato);
        }
      });


    this.formService.appartenenza.valueChanges.subscribe((x) => {
      if (x === 'SI') {
        this.formService.percInvalidita.setValidators([Validators.required, Validators.max(100), Validators.min(1), CustomValidators.onlyNumber]);
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




  private setInitialProvinceValue(data: Observable<Provincia[]> ) {
    data
      .pipe(
        filter(() => this.provinceInvSelect !== undefined),
        take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
          this.provinceInvSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

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

  allowNextStep() {
    return !this.parent.controls.formCategorieProtette.valid;
  }

  getSingleForm(id: string) {
    return this.parent.get('formCategorieProtette.' + id);
  }
}

