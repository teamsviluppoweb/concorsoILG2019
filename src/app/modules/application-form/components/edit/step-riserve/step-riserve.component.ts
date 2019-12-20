import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material';
import {DomandaService} from '../../../../../core/services/domanda.service';
import {RestService} from '../../../../../core/services/rest.service';
import {Riserva} from '../../../../../core/models/rest/rest-interface';
import {FormService} from '../../../../../core/services/form.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'step-riserve',
  templateUrl: './step-riserve.component.html',
  styleUrls: ['./step-riserve.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepRiserveComponent implements OnInit {
  @Input() form: FormGroup;


  elencoRiserve: Riserva[];

  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;

  constructor(private domandaService: DomandaService,
              private formService: FormService,
              private rest: RestService) {
  }

  ngOnInit() {

     this.rest.getRiserve().subscribe(
      (data: Riserva[]) => {
        this.elencoRiserve = data;

        if (this.domandaService.domandaobj.operazione === 1) {

          const riserveScelte = this.domandaService.domandaobj.domanda.lstRiserve;
          if (riserveScelte.length > 0) {


            this.formService.aventeRiserve.patchValue('SI');

            const rs: Riserva[] = [];


            for (let i = 0; i < this.elencoRiserve.length; i++) {
              for (let k = 0; k < riserveScelte.length; k++) {
                if (this.elencoRiserve[i].id === riserveScelte[k].id) {
                  rs.push(this.elencoRiserve[i]);
                }
              }
            }


            this.formService.riserveSelezionate.patchValue(rs);

          } else {
            this.formService.aventeRiserve.patchValue('NO');
          }
        }

      }
    );

     this.onChanges();
  }

  onChanges() {
    this.formService.aventeRiserve.valueChanges.subscribe((x) => {
      if (this.formService.aventeRiserve.value === 'SI') {
        this.formService.riserveSelezionate.setValidators(Validators.required);
      } else {
        this.formService.riserveSelezionate.clearValidators();
        this.formService.riserveSelezionate.reset();
        this.formService.riserveSelezionate.patchValue([]);
      }
      this.formService.riserveSelezionate.updateValueAndValidity();
    });
  }


  getSingleForm(id: string) {
    return this.formService.form.get('formRiserve.' + id);
  }


}


