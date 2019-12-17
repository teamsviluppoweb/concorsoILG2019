import { Injectable } from '@angular/core';
import {
  IntAnagCandidato,
  IntComuneNascitaOrLuogoIstituto,
  IntDomanda,
  IntDomandaObj, IntInvaliditaCivile, IntLstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua,
  IntTipologiaOrTitoloOrIndirizzo,
  IntTitoliStudioPossedutiEntity
} from './interfaces';
import {subscribeOn} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DomandaObj implements IntDomandaObj {
  domanda: IntDomanda;
  errore: string;
  operazione: number;

  public constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class DomandaModel implements IntDomanda {
  id: string;
  idDomanda: string;
  versione: number;
  stato: number;
  istanzaJSON: string;
  dataInvio: string;
  dataModifica: string;
  anagCandidato: AnagCandidato;
  titoloStudioPosseduto?: TitoliStudioPossedutiEntity | null;
  lingua: LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua;
  lstRiserve?: (LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua)[] | null;
  lstTitoliPreferenziali?: (LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua)[] | null;
  numeroFigli: number;
  invaliditaCivile: InvaliditaCivile | null;
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
export class TitoliStudioPossedutiEntity implements IntTitoliStudioPossedutiEntity {
  tipologia: TipologiaOrTitoloOrIndirizzo;
  titolo: TipologiaOrTitoloOrIndirizzo | null;
  indirizzo: TipologiaOrTitoloOrIndirizzo | null;
  dataConseguimento: string;
  istituto: string;
  luogoIstituto: ComuneNascitaOrLuogoIstituto;
  indirizzoIstituto: string;
  altroIndirizzoTitoloStudio?: string;

  constructor() {}

}

@Injectable({
  providedIn: 'root',
})
export class TipologiaOrTitoloOrIndirizzo implements  IntTipologiaOrTitoloOrIndirizzo {
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


}

@Injectable({
  providedIn: 'root',
})
export class InvaliditaCivile {
  percentuale: number;
  dataCertificazione: string;
  enteCertificatore: string;
  ausili: boolean;
  tempiAggiuntivi: boolean;
  esenteProvaPreselettiva: boolean;
  luogoRilascio: ComuneNascitaOrLuogoIstituto;


  constructor() {}

}
