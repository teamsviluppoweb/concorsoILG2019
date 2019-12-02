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
  domanda: Domanda;
  errore: string;
  operazione: number;
}

@Injectable({
  providedIn: 'root',
})
export class Domanda implements IntDomanda{
  id: string;
  idDomanda: string;
  versione: number;
  stato: number;
  istanzaJSON: string;
  dataInvio: string;
  dataModifica: string;
  anagCandidato: AnagCandidato;
  titoliStudioPosseduti?: (TitoliStudioPossedutiEntity)[] | null;
  lingua: LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua;
  lstRiserve?: (LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua)[] | null;
  lstTitoliPreferenziali?: (LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua)[] | null;
  invaliditaCivile: InvaliditaCivile;
}
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
export class ComuneNascitaOrLuogoIstituto implements  IntComuneNascitaOrLuogoIstituto{
  codice: string;
  nome: string;
  codiceProvincia: string;
}
export class TitoliStudioPossedutiEntity implements IntTitoliStudioPossedutiEntity{
  tipologia: TipologiaOrTitoloOrIndirizzo;
  titolo: TipologiaOrTitoloOrIndirizzo;
  indirizzo: TipologiaOrTitoloOrIndirizzo;
  dataConseguimento: string;
  istituto: string;
  luogoIstituto: ComuneNascitaOrLuogoIstituto;
  durataAnni: string;
}
export class TipologiaOrTitoloOrIndirizzo implements  IntTipologiaOrTitoloOrIndirizzo{
  id: string;
  desc: string;
}
export class LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua implements IntLstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua{
  id: number;
  descrizione: string;
}
export class InvaliditaCivile implements IntInvaliditaCivile{
  percentuale: number;
  dataCertificazione: string;
  enteCertificatore: string;
  provincia: string;
  ausili: boolean;
  tempiAggiuntivi: boolean;
  esenteProvaPreselettiva: boolean;
}
