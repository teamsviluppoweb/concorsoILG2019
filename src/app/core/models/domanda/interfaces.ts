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
  numeroFigli: number;
  invaliditaCivile?: IntInvaliditaCivile | null;
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
  titolo: IntTipologiaOrTitoloOrIndirizzo | null;
  indirizzo: IntTipologiaOrTitoloOrIndirizzo | null;
  dataConseguimento: string;
  istituto: string;
  luogoIstituto: IntComuneNascitaOrLuogoIstituto;
  indirizzoIstituto: string;
  altroIndirizzoTitoloStudio?: string;
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
  percentuale?: number | null;
  dataCertificazione?: string | null;
  enteCertificatore?: string | null;
  luogoRilascio?: IntComuneNascitaOrLuogoIstituto | null;
  ausili?: boolean | null;
  tempiAggiuntivi?: boolean | null;
  esenteProvaPreselettiva?: boolean | null;
}
