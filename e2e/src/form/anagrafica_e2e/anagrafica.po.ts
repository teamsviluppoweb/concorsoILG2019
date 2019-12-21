import {by, element} from 'protractor';

export class AnagraficaPo {

  anagraficaForm() {
    return {
      cognome:  element.all(by.css('input[formcontrolname=Cognome]')).get(0).getAttribute('value'),
      nome:  element.all(by.css('input[formcontrolname=Nome]')).get(0).getAttribute('value'),
      codiceFiscale:  element.all(by.css('input[formcontrolname=CodiceFiscale]')).get(0).getAttribute('value'),
      residenza:  element.all(by.css('input[formcontrolname=Residenza]')).get(0).getAttribute('value'),
      dataNascita:  element.all(by.css('input[formcontrolname=DataNascita]')).get(0).getAttribute('value'),
      telefono:  element.all(by.css('input[formcontrolname=Telefono]')).get(0).getAttribute('value'),
      email:  element.all(by.css('input[formcontrolname=Email]')).get(0).getAttribute('value'),
    };
  }

}

