import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { DomandaService} from '../../../../../core/services/domanda.service';
import {Lingua} from '../../../../../core/models/rest/rest-interface';
import {RestService} from '../../../../../core/services/rest.service';
import {FormService} from '../../../../../core/services/form.service';
import {FormGroup} from '@angular/forms';
import {Logger} from '../../../../../core/services';
import {Observable} from 'rxjs';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-lingua',
  templateUrl: './step-lingua.component.html',
  styleUrls: ['./step-lingua.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepLinguaComponent implements OnInit {
  @Input() form: FormGroup;
  log: Logger;
  $elencoLingue: Observable<Lingua[]>;


  constructor(private domandaService: DomandaService,
              private formService: FormService,
              private rest: RestService) {
    this.log = new Logger('STEP_LINGUA');
    this.$elencoLingue = this.rest.getLingueStraniere();
  }

  ngOnInit() {
      if (this.domandaService.isEditable) {
        this.$elencoLingue.subscribe((lingue: Lingua[]) => {
          const idLinguaSelezionata = this.domandaService.domandaobj.domanda.lingua.id;
          this.formService.patchFromObject(idLinguaSelezionata, lingue, this.formService.linguaSelezionata, 'id');
        });
      }
  }


  getSingleForm(id: string) {
    return this.formService.form.get('formLingua.' + id);
  }

}
