import {Component, Input, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Router} from '@angular/router';
import {concatMap} from 'rxjs/operators';
import {SidenavContainer, SidenavService} from '../../../../../core/services/sidenav.service';
import {DomandaObj} from '../../../../../core/models';
import {FormService} from '../../../../../core/services/form.service';

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

  constructor(private domandaService: DomandaService,
              private sidenav: SidenavService,
              private formService: FormService,
              private router: Router) {
  }

  inviaDomanda() {

    this.isSendingDisabled = true;
    this.formService.formToJson();
    this.domandaService.postDomanda(this.domandaService.domandaobj.domanda).pipe(
      concatMap(() => this.domandaService.getFreshDomanda())
    )
      .subscribe(
      (x: DomandaObj) => {
        const obj: SidenavContainer = {
          stato: x.operazione,
          ultimaModifica: x.domanda.dataModifica,
          dataInvio: x.domanda.dataInvio
        };

        this.sidenav.refreshData(obj);
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

