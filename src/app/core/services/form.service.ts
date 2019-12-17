import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomandaService} from './domanda.service';
import {RestService} from './rest.service';
import {TipologiaTitoloStudio} from '../models/rest/rest-interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private domanda: DomandaService, private http: RestService) { }

  serializeForm(fg: FormGroup) {
    fg.get('formIstruzione.dataConseguimento').patchValue(this.domanda.domandaobj.domanda.titoloStudioPosseduto.dataConseguimento);
    fg.get('formIstruzione.indirizzoFisico').patchValue(this.domanda.domandaobj.domanda.titoloStudioPosseduto.indirizzoIstituto);
    fg.get('formIstruzione.nomeIstituto').patchValue(this.domanda.domandaobj.domanda.titoloStudioPosseduto.istituto);

  }


}
