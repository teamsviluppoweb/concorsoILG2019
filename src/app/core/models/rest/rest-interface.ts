export interface Lingua {
  id: number;
  descrizione: string;
}

export interface Riserva {
  id: number;
  descrizione: string;
}

export interface TitoloPreferenziale {
  id: number;
  descrizione: string;
}

export interface TipologiaTitoloStudio {
  id: string;
  desc: string;
}

export interface TitoliTitoloStudio {
  id: string;
  desc: string;
}

export interface TitoliTitoloIndirizzo {
  id: string;
  desc: string;
}

export interface Provincia {
  codice: string;
  nome: string;
}

export interface Comune {
  codice: string;
  nome: string;
  codiceProvincia: string;
}

export interface InfoConorso {
  nomeConcorso: string;
  titoloConcorso: string;
  dataInizioDomanda: string;
  dataFineDomanda: string;
  dataFineConcorso: string;
}

export interface DomandaDinamica {
  titoloBlocco: string;
  coloreSfondoTitolo: string;
  tipo: number;
  dati?: (DatiEntity)[] | null;
}
export interface DatiEntity {
  etichetta?: string | null;
  valore?: string | null;
  size: number;
}

export interface Esito {
  codiceFiscale: string;
  cognome: string;
  nome: string;
  titoloConcorso: string;
  righeEsiti?: (RigheEsitiEntity)[] | null;
}
export interface RigheEsitiEntity {
  dataProva: string;
  provaTipo: ProvaTipoOrProvaEsito;
  sessione: number;
  provaEsito: ProvaTipoOrProvaEsito;
  punteggio: string;
  linkAllegati?: (string)[] | null;
  assenzaMalattia: AssenzaMalattia;
}
export interface ProvaTipoOrProvaEsito {
  id: number;
  descrizione: string;
}
export interface AssenzaMalattia {
  dataInizioMalattia: string;
  giorniCertificati: number;
  note: string;
  numeroProtocollo: string;
  dataProtocollo: string;
}
