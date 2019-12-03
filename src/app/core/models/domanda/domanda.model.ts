import { Injectable } from '@angular/core';
import {
  IntAnagCandidato,
  IntComuneNascitaOrLuogoIstituto,
  IntDomanda,
  IntDomandaObj, IntInvaliditaCivile, IntLstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua,
  IntTipologiaOrTitoloOrIndirizzo,
  IntTitoliStudioPossedutiEntity
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class DomandaObj implements IntDomandaObj{
  domanda: DomandaModel;
  errore: string;
  operazione: number;
}


export class DomandaModel implements IntDomanda {
  id: string;
  idDomanda: string;
  versione: number;
  stato: number;
  istanzaJSON: string;
  dataInvio: string;
  dataModifica: string;
  anagCandidato: AnagCandidato;
  titoliStudioPosseduti?: TitoliStudioPossedutiEntity | null;
  lingua: LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua;
  lstRiserve?: (LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua)[] | null;
  lstTitoliPreferenziali?: (LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua)[] | null;
  numFigli: string;
  invaliditaCivile: InvaliditaCivile;
}

@Injectable({
  providedIn: 'root',
})
export class AnagCandidato implements IntAnagCandidato{
  codiceFiscale: string;
  cognome: string;
  nome: string;
  dataNascita: string;
  comuneNascita: ComuneNascitaOrLuogoIstituto;
  residenza: string;
  telefono: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ComuneNascitaOrLuogoIstituto implements  IntComuneNascitaOrLuogoIstituto{
  codice: string;
  nome: string;
  codiceProvincia: string;

  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class TitoliStudioPossedutiEntity implements IntTitoliStudioPossedutiEntity{
  tipologia: TipologiaOrTitoloOrIndirizzo;
  titolo: TipologiaOrTitoloOrIndirizzo;
  indirizzo: TipologiaOrTitoloOrIndirizzo;
  dataConseguimento: string;
  istituto: string;
  luogoIstituto: ComuneNascitaOrLuogoIstituto;
  via: string;
  durataAnni: string;

  constructor() {}

}

@Injectable({
  providedIn: 'root',
})
export class TipologiaOrTitoloOrIndirizzo implements  IntTipologiaOrTitoloOrIndirizzo{
  id: string;
  desc: string;

  constructor() {}

}

@Injectable({
  providedIn: 'root',
})
export class LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua implements IntLstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua{
  id: number;
  descrizione: string;

  constructor() {}

}

@Injectable({
  providedIn: 'root',
})
export class InvaliditaCivile implements IntInvaliditaCivile{
  percentuale: number;
  dataCertificazione: string;
  enteCertificatore: string;
  provincia: string;
  ausili: boolean;
  tempiAggiuntivi: boolean;
  esenteProvaPreselettiva: boolean;

  constructor() {}

}
