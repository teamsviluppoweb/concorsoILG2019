import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {RestService} from '../../../../../core/services/rest.service';
import {Riserva, TitoloPreferenziale} from '../../../../../core/models/rest/rest-interface';

/* TODO: Cambiare mat toggle button con butotn per poter usare 2 way binding */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-riserve',
  templateUrl: './step-riserve.component.html',
  styleUrls: ['./step-riserve.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepRiserveComponent implements OnInit {
  clicker: boolean;
  @Input() parent: FormGroup;
  elencoRiserve: Riserva[];

  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  constructor(private domandaService: DomandaService, private rest: RestService) {
    this.clicker = false;
  }

  ngOnInit() {

     this.rest.getRiserve().subscribe(
      (data: Riserva[]) => {
        this.elencoRiserve = data;

        if (this.domandaService.domandaobj.operazione === 1) {

          let riserveScelte = this.domandaService.domandaobj.domanda.lstRiserve;
          if (riserveScelte.length > 0) {


            this.aventeRiserve.patchValue('SI');

            const rs: Riserva[] = [];


            for (let i = 0; i < this.elencoRiserve.length; i++) {
              for (let k = 0; k < riserveScelte.length; k++) {
                if (this.elencoRiserve[i].id === riserveScelte[k].id) {
                  rs.push(this.elencoRiserve[i]);
                }
              }
            }


            this.riserveSelezionate.patchValue(rs);

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
      this.domandaService.domandaobj.domanda.lstRiserve = x;
    });

  }


  ParseRiserve() {
    this.clicker = true;
    console.log(this.domandaService.domandaobj.domanda);
  }

  get riserveSelezionate() {
    return this.parent.get('formRiserve.riserveSelezionate');
  }

  get aventeRiserve() {
    return this.parent.get('formRiserve.aventeRiserve');
  }


}


