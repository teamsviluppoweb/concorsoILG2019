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
  tipologia: IntTipologiaOrTitoloOrIndirizzo | null;
  titolo: IntTipologiaOrTitoloOrIndirizzo | null;
  indirizzo: IntTipologiaOrTitoloOrIndirizzo | null;
  nomeIstituto: string | null;
  altroIndirizzo: string | null;
  indirizzoFisico: string | null;
  dataConseguimento: string | null;
  provinciaIstituto: string | null;
  comuneIstituto: string | null;
  comuniDropdown: string | null;
  provinceDropdown: string | null;
  tipologiaDropdown: string | null;
  titoloDropdown: string | null;
  indirizzoDropdown: string | null;
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

