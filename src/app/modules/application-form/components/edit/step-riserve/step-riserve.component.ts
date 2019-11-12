import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {Domanda} from '../../../../../core/models';
import {Riserve} from '../../../../../core/models';
import {concatMap} from 'rxjs/operators';

/* TODO: Cambiare mat toggle button con butotn per poter usare 2 way binding */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-riserve',
  templateUrl: './step-riserve.component.html',
  styleUrls: ['./step-riserve.component.scss']
})
export class StepRiserveComponent implements OnInit {
  clicker: boolean;
  @Input() parent: FormGroup;
  elencoRiserve: Riserve[];

  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  constructor(private domandaService: DomandaService) {
    this.clicker = false;
  }

  ngOnInit() {

     this.domandaService.getRiserve()
      .pipe(
        concatMap( (riserve: Riserve[]) => {
          this.elencoRiserve = riserve;
          return this.domandaService.getDomanda();
        })
      )
      .subscribe(
      (domanda: Domanda) => {
        if (domanda.DomandaConcorso.Stato === 1) {
          if (domanda.Riserve.length > 0) {
            this.aventeRiserve.patchValue('SI');

            const test = this.elencoRiserve.filter((x) => {
              for (let i = 0; i < domanda.Riserve.length; i++) {
                if (x.Id === domanda.Riserve[i].Id) {
                  return x;
                }
              }
            });
            this.riserveSelezionate.patchValue(test);
          } else {
            this.aventeRiserve.patchValue('NO');
          }
        }

      }
    );


    this.onChanges();
  }

  onChanges() {
    this.aventeRiserve.valueChanges.subscribe((x) => {
      if (this.aventeRiserve.value === 'SI') {
        this.riserveSelezionate.setValidators(Validators.required);
      } else {
        this.riserveSelezionate.clearValidators();
        this.riserveSelezionate.reset();
        this.riserveSelezionate.patchValue([]);
      }
      this.riserveSelezionate.updateValueAndValidity();
    });

    this.riserveSelezionate.valueChanges.subscribe( (x) => {
      this.domandaService.domanda.Riserve = x;
    });

  }


  ParseRiserve() {
    this.clicker = true;
  }

  get riserveSelezionate() {
    return this.parent.get('formRiserve.riserveSelezionate');
  }

  get aventeRiserve() {
    return this.parent.get('formRiserve.aventeRiserve');
  }


}


