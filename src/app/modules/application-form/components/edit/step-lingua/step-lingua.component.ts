import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';
import { DomandaService} from '../../../../../core/services/domanda.service';
import {HttpClient} from '@angular/common/http';
import {Lingua} from '../../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../../core/services/rest.service';
import {FormService} from '../../../../../core/services/form.service';

/* TODO: BUG: Mat toggle button una volta che è stato poopolato non accetta il primo input, si deve cliccare due volte*/



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-lingua',
  templateUrl: './step-lingua.component.html',
  styleUrls: ['./step-lingua.component.scss'],
})
export class StepLinguaComponent implements OnInit {

  /* Lo uso per triggerare l'errore in caso l'utente vada avanti senza aver scelto la lingua, mat-error non funziona
   su mat toggle button perchè non è 2 way binding,  */
  clicker;
  @Input() parent: FormGroup;
  elencoLingue: Lingua[];
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;


  constructor(private domandaService: DomandaService,
              private formService: FormService,
              private rest: RestService) {
    this.clicker = false;
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
    return !this.parent.controls.formLingua.valid;
  }

  getSingleForm(id: string) {
    return this.parent.get('formLingua.' + id);
  }
}
