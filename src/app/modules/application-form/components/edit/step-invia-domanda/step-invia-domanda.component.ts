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

    /*
    Serializzo i titoli di studio qui
     */


    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.tipologia = this.tipologia.value;
    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo = this.titolo.value;

    if (this.indirizzo.value === null) {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo = null;
    } else {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo = this.indirizzo.value;
      if (this.indirizzo.value.id === '351') {
        this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = this.altroIndirizzo.value;
      } else {
        this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = null;
      }
    }

    if (this.indirizzoFisico.value !== null) {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzoIstituto = this.indirizzoFisico.value;
    }

    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.istituto = this.nomeIstituto.value;
    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.dataConseguimento = this.dataConseguimento.value;
    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto = {
      codice: this.comuneIstituto.value.codice,
      nome: this.comuneIstituto.value.nome,
      codiceProvincia: this.provinciaIstituto.value.codice,
    };

    /*
        Serializzo i titoli preferenziali qui
    */

    if (this.aventeTitoli.value === 'NO') {
      this.domandaService.domandaobj.domanda.lstTitoliPreferenziali = [];
      this.domandaService.domandaobj.domanda.numeroFigli = null;
    }

    if (this.aventeTitoli.value === 'SI') {
      this.domandaService.domandaobj.domanda.lstTitoliPreferenziali = this.titoliSelezionati.value;

      if (this.titoliSelezionati.value.map(k => k.id).includes('17')) {
        this.domandaService.domandaobj.domanda.numeroFigli = this.numeroFigliSelezionati.value;
      } else {
        this.domandaService.domandaobj.domanda.numeroFigli = null;
      }
    }

    //

    if (this.domandaService.domandaobj.domanda.invaliditaCivile !== null) {
      if (this.domandaService.domandaobj.domanda.invaliditaCivile.percentuale === 0) {
        this.domandaService.domandaobj.domanda.invaliditaCivile = null;
      }
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

  /*
      REACTIVE FORM BOILER TEMPLATE
    */

  get tipologia() {
    return this.parent.get('formIstruzione.tipologia');
  }

  get titolo() {
    return this.parent.get('formIstruzione.titolo');
  }

  get indirizzo() {
    return this.parent.get('formIstruzione.indirizzo');
  }

  get dataConseguimento() {
    return this.parent.get('formIstruzione.dataConseguimento');
  }

  get nomeIstituto() {
    return this.parent.get('formIstruzione.nomeIstituto');
  }

  get indirizzoFisico() {
    return this.parent.get('formIstruzione.indirizzoFisico');
  }

  get altroIndirizzo() {
    return this.parent.get('formIstruzione.altroIndirizzo');
  }

  get provinciaIstituto() {
    return this.parent.get('formIstruzione.provinciaIstituto');
  }

  get comuneIstituto() {
    return this.parent.get('formIstruzione.comuneIstituto');
  }


  get titoliSelezionati() {
    return this.parent.get('formTitoliPreferenziali.titoliSelezionati');
  }

  get numeroFigliSelezionati() {
    return this.parent.get('formTitoliPreferenziali.numeroFigliSelezionati');
  }

  get aventeTitoli() {
    return this.parent.get('formTitoliPreferenziali.aventeTitoli');
  }

}

