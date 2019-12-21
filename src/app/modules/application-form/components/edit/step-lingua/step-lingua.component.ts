import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material';
import { DomandaService} from '../../../../../core/services/domanda.service';
import {Lingua} from '../../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../../core/services/rest.service';
import {FormService} from '../../../../../core/services/form.service';
import {FormGroup} from '@angular/forms';
import {Logger} from '../../../../../core/services';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-lingua',
  templateUrl: './step-lingua.component.html',
  styleUrls: ['./step-lingua.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepLinguaComponent implements OnInit, OnChanges {
  @Input() form: FormGroup;
  log: Logger;

  elencoLingue: Lingua[];
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;


  constructor(private domandaService: DomandaService,
              private formService: FormService,
              private detectionChange: ChangeDetectorRef,
  private rest: RestService) {
    this.log = new Logger('STEP_LINGUA');
  }

  /* Assegna la lingua al form dal mat button toggle */
  public onValChange(val: string) {
    this.formService.linguaSelezionata.patchValue(val);
  }

  ngOnInit() {
    this.rest.getLingueStraniere().subscribe((lingua: Lingua[]) => {

      this.elencoLingue = lingua;

      if (this.domandaService.isEditable) {

        const linguaSelezionata = this.elencoLingue
          .filter((x) => x.id === this.domandaService.domandaobj.domanda.lingua.id)
          .reduce(z => z);
        this.formService.linguaSelezionata.patchValue(linguaSelezionata);
      }

      /*
       * Siccome il componente è settato su onPush, non ricontrolla da solo i cambiamenti.
       * Una volta che la lista delle lingue è stata scaricato, avvisiamo angular di ricontrollare la view.
       * docs: https://angular.io/api/core/ChangeDetectorRef
      */
      this.detectionChange.markForCheck();
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.log.debug(changes);
  }

  getSingleForm(id: string) {
    return this.formService.form.get('formLingua.' + id);
  }

}
