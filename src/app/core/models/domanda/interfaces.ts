export interface IntDomandaObj {
  domanda: IntDomanda;
  errore: string;
  operazione: number;
}
export interface IntDomanda {
  id: string;
  idDomanda: string;
  versione: number;
  stato: number;
  istanzaJSON: string;
  dataInvio: string;
  dataModifica: string;
  anagCandidato: IntAnagCandidato;
  titoloStudioPosseduto?: IntTitoliStudioPossedutiEntity | null;
  lingua: IntLstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua;
  lstRiserve?: (IntLstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua)[] | null;
  lstTitoliPreferenziali?: (IntLstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua)[] | null;
  numFigli?: string;
  invaliditaCivile: IntInvaliditaCivile;
}
export interface IntAnagCandidato {
  codiceFiscale: string;
  cognome: string;
  nome: string;
  dataNascita: string;
  comuneNascita: IntComuneNascitaOrLuogoIstituto;
  residenza: string;
  telefono: string;
  email: string;
}
export interface IntComuneNascitaOrLuogoIstituto {
  codice: string;
  nome: string;
  codiceProvincia: string;
}
export interface IntTitoliStudioPossedutiEntity {
  tipologia: IntTipologiaOrTitoloOrIndirizzo;
  titolo: IntTipologiaOrTitoloOrIndirizzo;
  indirizzo: IntTipologiaOrTitoloOrIndirizzo;
  dataConseguimento: string;
  istituto: string;
  luogoIstituto: IntComuneNascitaOrLuogoIstituto;
  indirizzoIstituto: string;
}
export interface IntTipologiaOrTitoloOrIndirizzo {
  id: string;
  desc: string;
}
export interface IntLstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua {
  id: number;
  descrizione: string;
}
export interface IntInvaliditaCivile {
  percentuale: number;
  dataCertificazione: string;
  enteCertificatore: string;
  luogoRilascio: IntComuneNascitaOrLuogoIstituto;
  ausili: boolean;
  tempiAggiuntivi: boolean;
  esenteProvaPreselettiva: boolean;
}
