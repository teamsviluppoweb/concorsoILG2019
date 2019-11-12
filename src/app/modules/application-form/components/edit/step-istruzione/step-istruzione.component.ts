import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatSelect} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {ReplaySubject, Subject} from 'rxjs';
import {concatMap, filter, map, take, takeUntil} from 'rxjs/operators';
import {Domanda} from '../../../../../core/models';

/*
  TODO: Creare classe unica di MyErrorStateMatcher
 */


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-istruzione',
  templateUrl: './step-istruzione.component.html',
  styleUrls: ['./step-istruzione.component.scss'],
})
export class StepIstruzioneComponent implements OnInit, OnDestroy {

  @Input() parent: FormGroup;
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  listaProvince: any;
  listaNomiProvince: any;
  listaNomiComuni: any;
   // Lista delle province filtrate dalle parole chiavi nel campo
  public filteredBanks: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
   // Lista dei comuni filtrate dalle parole chiavi nel campo
  public filteredComuni: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  private onDetroy = new Subject<void>();

  istitutoFrequentatoSub;
  tipoDiplomaSub;
  annoDiplomaSub;
  comuneSub;
  comuneDropSub;
  provinciaSub;
  provinciaDropSub;
  viaSub;



  // TODO: Condividere chiamata http dai form child

  constructor(private formbuilder: FormBuilder,
              private domandaService: DomandaService) {
  }

  /**
   * Imposta il valore iniziale dopo che il filtro è stato inizializzato
   */

  private setInitialValue(value) {
    value
      .pipe(take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  /**
   * Filtra la lista durante l'input
   */

  private filterList(value, form, filters) {
    if (!value) {
      return;
    }
    // ottiene la keyword di ricerca
    let search = form.value;
    if (!search) {
      filters.next(value.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // Filtra le province
    filters.next(
      value.filter(prov => prov.toLocaleLowerCase().indexOf(search) > -1)
    );
  }

  ngOnInit() {


    /* ## Disabilita il required di istruzione */
    /*
      for (const key in this.parent['controls'].formIstruzione['controls']) {
      this.parent.get('formIstruzione.' + key).clearValidators();
      this.parent.get('formIstruzione.' + key).updateValueAndValidity();
    }
     */

    this.domandaService.getProvince()
      .pipe(
        concatMap( (Province) => {

          this.listaProvince = Province;
          this.setInitialValue(this.filteredBanks);

          // Gli passo un array di stringhe contenente solo i nomi delle province
          this.filteredBanks.next(this.listaProvince.map(nome => nome.provincia).slice());
          this.listaNomiProvince = this.listaProvince.map(nome => nome.provincia).slice();

          return this.domandaService.getDomanda();
        }),
      )
      .subscribe(
        (domanda: Domanda) => {

          if (domanda.DomandaConcorso.Stato === 1) {
            this.parent.get('formIstruzione').patchValue({
              annoDiploma: domanda.TitoloDiploma.AnnoConseguimento,
              provinciaIstituto: domanda.TitoloDiploma.Provincia,
              comuneIstituto: domanda.TitoloDiploma.Comune,
              viaIstituto: domanda.TitoloDiploma.Indirizzo,
              istitutoFrequentato: domanda.TitoloDiploma.Istituto,
              tipoDiploma: domanda.TitoloDiploma.TipoDiploma
            });
          }

        }
      );
    this.onChanges();
  }

  onChanges() {

    this.provinciaSub = this.provinciaIstituto.valueChanges
      .pipe(
        // Mi assicuro che il valore nel form sia valido
        filter(() => this.provinciaIstituto.valid),
        // Mi ricavo il codice provincia per ricavare i comuni
        map( () => {
          return this.listaProvince
            .filter(selected => selected.provincia === this.provinciaIstituto.value)
            .map(selected => selected.codProvincia)
            .reduce(selected => selected);
        }),
        // Mi ricavo i comuni
        concatMap(val => this.domandaService.getComuni(val))
      )
      .subscribe((value: any[]) => {

        this.listaNomiComuni = value;

        // Popolo la dropdown con i comuni
        this.setInitialValue(this.filteredComuni);
        this.filteredComuni.next(this.listaNomiComuni.slice());

        this.domandaService.domanda.TitoloDiploma.Provincia = this.provinciaIstituto.value;
      });


    this.comuneSub = this.comuneIstituto.valueChanges.subscribe( () => {
      this.domandaService.domanda.TitoloDiploma.Comune = this.comuneIstituto.value;
    });

    this.annoDiplomaSub = this.annoDiploma.valueChanges.subscribe(
      () => this.domandaService.domanda.TitoloDiploma.AnnoConseguimento = this.annoDiploma.value
    );

    this.viaSub = this.viaIstituto.valueChanges.subscribe(
      () => this.domandaService.domanda.TitoloDiploma.Indirizzo = this.viaIstituto.value
    );

    this.istitutoFrequentatoSub =  this.istitutoFrequentato.valueChanges.subscribe(
      () => this.domandaService.domanda.TitoloDiploma.Istituto = this.istitutoFrequentato.value
    );

    this.tipoDiplomaSub = this.tipoDiploma.valueChanges.subscribe(
      () => this.domandaService.domanda.TitoloDiploma.TipoDiploma = this.tipoDiploma.value
    );

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search dei comuni
    this.comuneDropSub = this.comuniDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filterList(this.listaNomiComuni, this.comuniDropdown, this.filteredComuni);
      });

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search delle province
    this.provinciaDropSub = this.provinceDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filterList(this.listaNomiProvince, this.provinceDropdown, this.filteredBanks);
      });
  }

  ngOnDestroy() {
    this.onDetroy.next();
    this.onDetroy.complete();

    this.istitutoFrequentatoSub.unsubscribe();
    this.tipoDiplomaSub.unsubscribe();
    this.annoDiplomaSub.unsubscribe();
    this.comuneSub.unsubscribe();
    this.comuneDropSub.unsubscribe();
    this.provinciaSub.unsubscribe();
    this.provinciaDropSub.unsubscribe();
    this.viaSub.unsubscribe();
  }



  get istitutoFrequentato() {
    return this.parent.get('formIstruzione.istitutoFrequentato');
  }

  get tipoDiploma() {
    return this.parent.get('formIstruzione.tipoDiploma');
  }

  get provinciaIstituto() {
    return this.parent.get('formIstruzione.provinciaIstituto');
  }

  get provinceDropdown() {
    return this.parent.get('formIstruzione.provinceDropdown');
  }

  get comuneIstituto() {
    return this.parent.get('formIstruzione.comuneIstituto');
  }

  get comuniDropdown() {
    return this.parent.get('formIstruzione.comuniDropdown');
  }

  get viaIstituto() {
    return this.parent.get('formIstruzione.viaIstituto');
  }

  get annoDiploma() {
    return this.parent.get('formIstruzione.annoDiploma');
  }

}
