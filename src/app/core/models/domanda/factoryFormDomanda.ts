import {CategorieProtette, FormDomanda, IstruzioneForm} from './form';
import {IntDomanda} from './interfaces';

export class FactoryFormDomanda {
  formDomanda: FormDomanda;
  jsonDomanda: IntDomanda;

  constructor() {
    this.formDomanda = new FormDomanda();
    this.formDomanda.categorieProtette = new CategorieProtette();
    this.formDomanda.istruzione = new IstruzioneForm();
  }

  serialize(json: IntDomanda) {
    this.jsonDomanda = json;



  }


}
