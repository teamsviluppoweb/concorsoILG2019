export interface Lingue {
  Id: string;
  Descrizione: string;
}

export interface Comuni {
  table?: (Comune)[] | null;
}
export interface Comune {
  codISTAT: number;
  codProvincia: string;
  comune: string;
  cap: string;
  codNazionale: string;
  codCatastale: string;
  flagVariazione: number;
}

export interface Province {
  table?: (Provincia)[] | null;
}
export interface Provincia {
  codProvincia: string;
  provincia: string;
  codRegione: number;
  regione: string;
}

export interface Titoli {
  Id: number;
  Descrizione: string;
}

export interface Riserve {
  Id: number;
  Descrizione: string;
}
