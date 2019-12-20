import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {MatSnackBar, MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Router} from '@angular/router';
import {concatMap} from 'rxjs/operators';
import {SidenavDati, SidenavService} from '../../../../../core/services/sidenav.service';
import {DomandaObj} from '../../../../../core/models';
import {FormService} from '../../../../../core/services/form.service';
import {SnackBarComponent} from '../../../../../shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'step-invia-domanda',
  templateUrl: './step-invia-domanda.component.html',
  styleUrls: ['./step-invia-domanda.component.scss'],
})
export class StepInviaDomandaComponent  {

  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;
  isSendingDisabled = false;

  constructor(private domandaService: DomandaService,
              private sidenav: SidenavService,
              private formService: FormService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000,
      /* Lo stile del panel class si trova in style.css */
      panelClass: ['agid-snackbar'],
      verticalPosition: 'top'
    });
  }

  inviaDomanda() {

    console.log(this.formService.tipologia.value);

    /* Disabilita momentaneamente il bottone di invio finquando il server non risponde 200 al post*/
    this.isSendingDisabled = true;
    /* Serializza i dati del form in formato json*/
    this.formService.formToJson();

    this.domandaService.postDomanda(this.domandaService.domandaobj.domanda).pipe(
      concatMap(() => this.domandaService.getDomanda())
    )
      .subscribe(
      (x: DomandaObj) => {

        this.openSnackBar();


        const obj: SidenavDati = {
          stato: x.operazione,
          dataUltimaModifica: x.domanda.dataModifica,
          dataPrimoInvio: x.domanda.dataInvio
        };
        /* Aggiorna i dati della sidenav con i dati dell'ultime operazioni eseguite sulla navbar */
        this.sidenav.aggiornaDati(obj);

        this.router.navigate(['/user']);
        this.isSendingDisabled = false;
      }
    );
  }


  formready() {
    return this.formService.form.valid;
  }


}

