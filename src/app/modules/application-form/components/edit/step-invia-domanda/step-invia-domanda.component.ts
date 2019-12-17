import { Component, Input, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Router} from '@angular/router';
import {concatMap} from 'rxjs/operators';
import {SidenavContainer, SidenavService} from '../../../../../core/services/sidenav.service';
import {DomandaObj} from '../../../../../core/models';

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

  constructor(private domandaService: DomandaService, private sidenav: SidenavService, private router: Router) {
  }

  inviaDomanda() {
    this.isSendingDisabled = true;

    if (this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
      if (this.domandaService.domandaobj.domanda.invaliditaCivile.percentuale === 0) {
        this.domandaService.domandaobj.domanda.invaliditaCivile = null;
      }
    }

    if(this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio === '') {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = null;
    }

    if(this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo !== null) {
      if(this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo.id !== '351') {
        this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = null;
      }
    } else {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = null;
    }

    if (!this.domandaService.domandaobj.domanda.lstTitoliPreferenziali.map(k => k.id).includes(17)) {
      this.domandaService.domandaobj.domanda.numeroFigli = 0;
    }

    console.log(this.domandaService.domandaobj.domanda);

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

        this.sidenav.updateContainer(obj);
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

