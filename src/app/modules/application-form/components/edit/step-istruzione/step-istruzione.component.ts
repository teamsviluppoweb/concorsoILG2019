import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MatSelect} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {concatMap, filter, map, take, takeUntil} from 'rxjs/operators';
import {Comune, Provincia} from '../../../../../core/models/rest/rest-interface';
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
  @ViewChild('provinceSelect', { static: true }) provinceSelect: MatSelect;
  @ViewChild('comuneSelect', { static: true }) comuneSelect: MatSelect;


  public filtroProvince: ReplaySubject<Provincia[]> = new ReplaySubject<Provincia[]>(1);
  listaProvince: Provincia[];


  public filtroComuni: ReplaySubject<Comune[]> = new ReplaySubject<Comune[]>(1);
  listaComuni: Comune[];



  private onDetroy = new Subject<void>();



  // TODO: Condividere chiamata http dai form child

  constructor(private formbuilder: FormBuilder,
              private rest: RestService,
              private domandaService: DomandaService) {
  }


  ngOnInit() {

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

    this.provinciaIstituto.valueChanges
      .pipe(
        // Mi assicuro che il valore nel form sia valido
        filter(() => this.provinciaIstituto.valid),
        concatMap((data: Provincia) => this.rest.getComuni(data.codice))
      )
      .subscribe((data: Comune[]) => {
        this.listaComuni = data;
        this.filtroComuni.next(this.listaComuni.slice());
        this.setInitialComuneValue(this.filtroComuni);
      });


    this.comuneIstituto.valueChanges.subscribe( () => {
      this.domandaService.domandaobj.domanda.titoliStudioPosseduti = this.comuneIstituto.value;
    });

    this.annoDiploma.valueChanges.subscribe(
      () => this.domandaService.domanda.TitoloDiploma.AnnoConseguimento = this.annoDiploma.value
    );

    this.viaIstituto.valueChanges.subscribe(
      () => this.domandaService.domanda.TitoloDiploma.Indirizzo = this.viaIstituto.value
    );

    this.istitutoFrequentato.valueChanges.subscribe(
      () => this.domandaService.domanda.TitoloDiploma.Istituto = this.istitutoFrequentato.value
    );

    this.tipoDiploma.valueChanges.subscribe(
      () => this.domandaService.domanda.TitoloDiploma.TipoDiploma = this.tipoDiploma.value
    );

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search dei comuni
    this.comuniDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filterList(this.listaNomiComuni, this.comuniDropdown, this.filteredComuni);
      });

    // Analizza i cambiamenti del testo nel campo di ricerca del dropdown search delle province
    this.provinceDropdown.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filterList(this.listaNomiProvince, this.provinceDropdown, this.filteredBanks);
      });
  }





  private setInitialProvinceValue(data: Observable<Provincia[]>) {
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

  ngOnDestroy() {
    this.onDetroy.next();
    this.onDetroy.complete();

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
