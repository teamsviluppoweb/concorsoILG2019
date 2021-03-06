import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {FormService} from '../../../../../core/services/form.service';

@Component({
  selector: 'app-step-dichiarazione',
  templateUrl: './step-dichiarazione.component.html',
  styleUrls: ['./step-dichiarazione.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepDichiarazioneComponent {
  @Input() form: FormGroup;

  testoDichiarazioni = [
    'il possesso della cittadinanza italiana e il godimento dei diritti politici',
    'l’idoneità fisica all’impiego e di essere a conoscenza che l’amministrazione ha la facoltà di sottoporre a visita medica di controllo i vincitori di concorso, in base alla normativa vigente;\n',
    // tslint:disable-next-line:max-line-length
    'di non essere stati espulsi dalle forze armate e dai corpi militarmente organizzati, di non essere stati destituiti da pubblici uffici o dispensati dall’impiego presso una pubblica amministrazione per persistente insufficiente rendimento, di non essere stati dichiarati decaduti da un impiego statale, ai sensi dell’art. 127, comma 1, lettera d), del decreto del Presidente della Repubblica 10 gennaio 1957, n. 3;\n',
    'di non avere riportato condanne a pena detentiva per reati non colposi; ',
    'di non essere stati sottoposti a misure di prevenzione;\n',
    'di esprimere il consenso al trattamento dei dati personali per le finalità e con le modalità di cui al decreto legislativo 30 giugno 2003, n.196 e successive modificazioni.\n'
  ];

  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  constructor(private domandaService: DomandaService, private formService: FormService) {
  }


  get approvazione() {
    return this.formService.form.get('formDichiarazione.approvazione');
  }


}

