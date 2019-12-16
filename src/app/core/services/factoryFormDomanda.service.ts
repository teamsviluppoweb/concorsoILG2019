import {CategorieProtette, FormDomanda, IstruzioneForm} from '../models/domanda/form';
import {Injectable} from '@angular/core';
import {IntDomanda} from '../models';

@Injectable({
  providedIn: 'root'
})
export class FactoryFormDomandaService {
  formDomanda: FormDomanda;
  jsonDomanda: IntDomanda;

  constructor() {
    this.formDomanda = new FormDomanda();
    this.formDomanda.categorieProtette = new CategorieProtette();
    this.formDomanda.istruzione = new IstruzioneForm();
  }

  serialize(json: IntDomanda) {
    this.jsonDomanda = json;

    // Serializzo istruzione


  }




}
