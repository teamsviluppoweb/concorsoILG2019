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
