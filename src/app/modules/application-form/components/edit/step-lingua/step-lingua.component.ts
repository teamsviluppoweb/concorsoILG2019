import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from '@angular/material';
import { DomandaService} from '../../../../../core/services/domanda.service';
import {Lingua} from '../../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../../core/services/rest.service';
import {FormService} from '../../../../../core/services/form.service';
import {FormGroup} from '@angular/forms';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-lingua',
  templateUrl: './step-lingua.component.html',
  styleUrls: ['./step-lingua.component.scss'],
})
export class StepLinguaComponent implements OnInit {
  @Input() form: FormGroup;

  elencoLingue: Lingua[];
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;


  constructor(private domandaService: DomandaService,
              private formService: FormService,
              private rest: RestService) {
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
      });

  }


  allowNextStep() {
    return !this.formService.form.controls.formLingua.valid;
  }

  getSingleForm(id: string) {
    return this.formService.form.get('formLingua.' + id);
  }

}
