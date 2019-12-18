import { Component, Input, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Router} from '@angular/router';
import {concatMap} from 'rxjs/operators';
import {SidenavContainer, SidenavService} from '../../../../../core/services/sidenav.service';
import {DomandaObj, IntTitoliStudioPossedutiEntity} from '../../../../../core/models';
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

    /*
    Serializzo i titoli di studio qui
     */

    // Se è la prima volta che la domanda viene compilata tolgo il null alle sezioni obbligatorie



    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.tipologia = this.formService.tipologia.value;
    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.titolo = this.formService.titolo.value;

    if (this.formService.indirizzo.value === null) {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo = null;
    } else {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzo = this.formService.indirizzo.value;
      if (this.formService.indirizzo.value.id === '341') {
        this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = this.formService.altroIndirizzo.value;
      } else {
        this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = null;
      }
    }

    if(this.formService.altroIndirizzo.value !== null) {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.altroIndirizzoTitoloStudio = this.formService.altroIndirizzo.value;
    }

    if (this.formService.indirizzoFisico.value !== null) {
      this.domandaService.domandaobj.domanda.titoloStudioPosseduto.indirizzoIstituto = this.formService.indirizzoFisico.value;
    }

    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.istituto = this.formService.nomeIstituto.value;
    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.dataConseguimento = this.formService.dataConseguimento.value;
    this.domandaService.domandaobj.domanda.titoloStudioPosseduto.luogoIstituto = {
      codice: this.formService.comuneIstituto.value.codice,
      nome: this.formService.comuneIstituto.value.nome,
      codiceProvincia: this.formService.provinciaIstituto.value.codice,
    };


    /*
      Serializzo la lingua
     */

    this.domandaService.domandaobj.domanda.lingua = this.formService.linguaSelezionata.value;

    /*
        Serializzo i titoli preferenziali qui
    */

    if (this.formService.aventeTitoli.value === 'NO') {
      this.domandaService.domandaobj.domanda.lstTitoliPreferenziali = [];
      this.domandaService.domandaobj.domanda.numeroFigli = 0;
    }

    if (this.formService.aventeTitoli.value === 'SI') {
      this.domandaService.domandaobj.domanda.lstTitoliPreferenziali = this.formService.titoliSelezionati.value;

      if (this.formService.titoliSelezionati.value.map(k => k.id).includes(17)) {
        this.domandaService.domandaobj.domanda.numeroFigli = this.formService.numeroFigliSelezionati.value;
      } else {
        this.domandaService.domandaobj.domanda.numeroFigli = 0;
      }
    }

    //


    /*
         Serializzo le riserve qui
     */

    this.domandaService.domandaobj.domanda.lstRiserve = this.formService.riserveSelezionate.value;

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


}

