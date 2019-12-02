import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Domanda {
  DomandaConcorso: DomandaConcorso;
  Anagrafica: Anagrafica;
  TitoloDiploma: TitoloDiploma;
  Lingua: Lingua;
  Riserve?: Riserva[] | null;
  TitoliPreferenziali?: Titolo[] | null;
  Invalidita?: Invalidita;
  NumeroFigli: string;


  constructor() {
    this.DomandaConcorso = new DomandaConcorso();
    this.Anagrafica = new Anagrafica();
    this.TitoloDiploma = new TitoloDiploma();
    this.Lingua = new Lingua();
    this.Invalidita = new Invalidita();
  }
}

export class DomandaConcorso {
  IdDomanda: string;
  Versione: string;
  Stato: number;
  IstanzaJSON: string;
  DataInvio: string;
  DataModifica: string;
}
export class Anagrafica {
  CodiceFiscale: string;
  Cognome: string;
  Nome: string;
  ProvinciaNascita: string;
  ComuneNascita: string;
  DataNascita: string;
  Sesso: string;
  Residenza: string;
  Cellulare: string;
  Email: string;
  DomicilioDigitale: string;
}
export class TitoloDiploma {
  TipoDiploma: string;
  Istituto: string;
  AnnoConseguimento: string;
  Provincia: string;
  Comune: string;
  Indirizzo: string;
}
export class Lingua {
  Id: string;
  Descrizione: string;
}
export class Invalidita {
  prcInvalidita: string;
  enteInvalidita: string;
  dataInvalidita: string;
  eszProva: string;
  ausProva: string;
  tmpAggiuntivi: string;
}

export class Riserva {
  Id: number;
  Descrizione: string;
}

export class Titolo {
  Id: number;
  Descrizione: string;
}
