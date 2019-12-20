import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatSelect} from '@angular/material';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {filter, take, takeUntil} from 'rxjs/operators';
import {Logger} from '../../../core/services';

@Component({
  selector: 'mat-filter-select',
  templateUrl: './mat-filter-select.component.html',
  styleUrls: ['./mat-filter-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatFilterSelectComponent implements OnChanges, OnDestroy {
  @Input() dataSet;
  @Input() bindedForm;
  @Input() iterateOver?;
  @Input() multiple? = false;
  filter = new FormControl('');

  @ViewChild('select', { static: true }) select: MatSelect;
  public filtro: ReplaySubject<any> = new ReplaySubject<any>(1);

  private onDetroy = new Subject<void>();

  log;

  constructor() {
    this.log = new Logger('mat-filter-component');
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes.dataSet && this.dataSet !== undefined) {
      this.dataSet = this.dataSet.slice();
      console.log(this.dataSet);
      this.log.debug(this.dataSet);
      this.filtro.next(this.dataSet.slice());
      this.setInitialValue(this.filtro);
    }

    this.bindedForm.valueChanges.subscribe( (x) => {

    });

    this.filter.valueChanges
      .pipe(takeUntil(this.onDetroy))
      .subscribe(() => {
        this.filtraRicerca(this.dataSet, this.filter, this.filtro);
      });

  }


  private filtraRicerca(data, form, filters) {
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
      data.filter(nm => {


        if (nm[this.iterateOver] !== undefined) {
          return nm[this.iterateOver].toLocaleLowerCase().indexOf(search) > -1;
        }
      })
    );
  }

  private setInitialValue(data: Observable<any>) {
    data
      .pipe(
        filter(() => this.select !== undefined),
        take(1), takeUntil(this.onDetroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.select.compareWith = (a: string, b: string) => a && b && a === b;
      });
  }

  ngOnDestroy() {
    this.onDetroy.next();
    this.onDetroy.complete();
  }

}
