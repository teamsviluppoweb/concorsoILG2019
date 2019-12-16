import {IntTipologiaOrTitoloOrIndirizzo} from './interfaces';
import {Lingua, Riserva, TitoloPreferenziale} from '../rest/rest-interface';

export class FormDomanda {
  istruzione: IstruzioneForm;
  lingua: Lingua;
  titoliPreferenziali: TitoloPreferenziale[];
  riseve: Riserva[];
  categorieProtette: CategorieProtette;
}

export class IstruzioneForm {
  tipologia: IntTipologiaOrTitoloOrIndirizzo;
  titolo: IntTipologiaOrTitoloOrIndirizzo;
  indirizzo: IntTipologiaOrTitoloOrIndirizzo;
  nomeIstituto: string;
  indirizzoFisico: string;
  dataConseguimento: string;
  provinciaIstituto: string;
  comuneIstituto: string;
  comuniDropdown: string;
  provinceDropdown: string;
  tipologiaDropdown: string;
  titoloDropdown: string;
  indirizzoDropdown: string;
}

export class CategorieProtette {
  appartenenza: boolean;
  percInvalidita: number;
  dataCertificazione: string;
  comune: string;
  comuniDropdown: string;
  provincia: string;
  provinceDropdown: string;
  invaliditaEnte: string;
  ausiliProva: boolean;
  tempiAggiuntiviProva: boolean;
  esenzioneProvaSelettiva: boolean;
}

