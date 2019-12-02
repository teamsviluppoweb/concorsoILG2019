export interface Domanda {
  domanda: Domanda1;
  errore: string;
  operazione: number;
}
export interface Domanda1 {
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
export interface AnagCandidato {
  codiceFiscale: string;
  cognome: string;
  nome: string;
  dataNascita: string;
  comuneNascita: ComuneNascitaOrLuogoIstituto;
  residenza: string;
  telefono: string;
  email: string;
}
export interface ComuneNascitaOrLuogoIstituto {
  codice: string;
  nome: string;
  codiceProvincia: string;
}
export interface TitoliStudioPossedutiEntity {
  tipologia: TipologiaOrTitoloOrIndirizzo;
  titolo: TipologiaOrTitoloOrIndirizzo;
  indirizzo: TipologiaOrTitoloOrIndirizzo;
  dataConseguimento: string;
  istituto: string;
  luogoIstituto: ComuneNascitaOrLuogoIstituto;
  durataAnni: string;
}
export interface TipologiaOrTitoloOrIndirizzo {
  id: string;
  desc: string;
}
export interface LstRiserveEntityOrLstTitoliPreferenzialiEntityOrLingua {
  id: number;
  descrizione: string;
}
export interface InvaliditaCivile {
  percentuale: number;
  dataCertificazione: string;
  enteCertificatore: string;
  provincia: string;
  ausili: boolean;
  tempiAggiuntivi: boolean;
  esenteProvaPreselettiva: boolean;
}
