import { Component, Input, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-invia-domanda',
  templateUrl: './step-invia-domanda.component.html',
  styleUrls: ['./step-invia-domanda.component.scss'],
})
export class StepInviaDomandaComponent  {

  @Input() parent: FormGroup;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;
  isSendingDisabled = false;

  constructor(private domandaService: DomandaService, private router: Router) {
  }

  inviaDomanda() {
    this.isSendingDisabled = true;

    if(this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
      if (this.domandaService.domandaobj.domanda.invaliditaCivile.percentuale === 0) {
        this.domandaService.domandaobj.domanda.invaliditaCivile = null;
      }
    }


    this.domandaService.postDomanda(this.domandaService.domandaobj.domanda)
      .subscribe(
      () => {
        localStorage.setItem('domanda', JSON.stringify(this.domandaService.domandaobj));
        this.domandaService.sendMessage('Modifica Domanda');
        this.domandaService.sendStato(true);


        this.router.navigate(['/user']);
        this.isSendingDisabled = false;
      }
    );
  }


  formready() {
    return this.parent.valid;
  }


}

