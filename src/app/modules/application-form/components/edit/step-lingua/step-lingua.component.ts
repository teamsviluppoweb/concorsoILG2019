import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material';
import { DomandaService} from '../../../../../core/services/domanda.service';
import {HttpClient} from '@angular/common/http';
import {Lingue} from '../../../../../core/models';
import {Domanda} from '../../../../../core/models';
import {concatMap} from 'rxjs/operators';

/* TODO: BUG: Mat toggle button una volta che è stato poopolato non accetta il primo input, si deve cliccare due volte*/



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-lingua',
  templateUrl: './step-lingua.component.html',
  styleUrls: ['./step-lingua.component.scss']
})
export class StepLinguaComponent implements OnInit {

  /* Lo uso per triggerare l'errore in caso l'utente vada avanti senza aver scelto la lingua, mat-error non funziona
   su mat toggle button perchè non è 2 way binding,  */
  clicker;
  @Input() parent: FormGroup;
  elencoLingue:  Lingue[];
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;


  constructor(private domandaService: DomandaService, private hc: HttpClient, private _formBuilder: FormBuilder) {
    this.clicker = false;
  }

  /* Assegna la lingua al form dal mat button toggle */
  public onValChange(val: string) {
    this.linguaSelezionata.patchValue(val);
  }

// TODO: Check perchè lingua non si mostra in invia domanda
  ngOnInit() {
    this.domandaService.getLingueStraniere()
      .pipe(
        concatMap( (lingue: Lingue[]) => {
          this.elencoLingue = lingue;
          return this.domandaService.getDomanda();
        })
      )
      .subscribe((domanda: Domanda) => {
        if (domanda.DomandaConcorso.Stato === 1) {

          const linguaSelezionata = this.elencoLingue.filter((x) => {
              if (x.Id === domanda.Lingua.Id) {
                return x;
              }
          }).reduce(z => z);

          this.linguaSelezionata.patchValue(linguaSelezionata);
        }
      });

    this.domandaService.getDomanda().subscribe(
      (domanda: Domanda) => {
        if (domanda.DomandaConcorso.Stato === 1) {
          this.linguaSelezionata.patchValue(domanda.Lingua.Descrizione);
        }
      }
    );

    this.linguaSelezionata.valueChanges.subscribe( () => this.domandaService.domanda.Lingua = this.linguaSelezionata.value);

  }


  get linguaSelezionata() {
    return this.parent.get('formLingua.linguaSelezionata');
  }
}
