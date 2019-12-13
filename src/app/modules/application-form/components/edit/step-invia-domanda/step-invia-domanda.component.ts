import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-invia-domanda',
  templateUrl: './step-invia-domanda.component.html',
  styleUrls: ['./step-invia-domanda.component.scss']
})
export class StepInviaDomandaComponent  {

  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  constructor(private domandaService: DomandaService, private router: Router) {
  }

  inviaDomanda() {
    console.log(this.domandaService.domandaobj.domanda);

      this.domandaService.postDomanda(this.domandaService.domandaobj.domanda).subscribe(
      () => {
        localStorage.setItem('domanda', JSON.stringify(this.domandaService.domandaobj));
        this.domandaService.sendMessage('Modifica Domanda');
        this.domandaService.sendStato(true);

        console.log(this.domandaService.domandaobj.domanda);

        this.router.navigate(['/user']);
      }
    );
  }


}
