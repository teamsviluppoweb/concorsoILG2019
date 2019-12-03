import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DomandaService} from '../../../../core/services/domanda.service';

@Component({
  selector: 'app-submission-result',
  templateUrl: './domanda-candidato.component.html',
  styleUrls: ['./domanda-candidato.component.scss'],
})
export class DomandaCandidatoComponent implements OnInit {

  md: FormGroup;

  displayTitoli = false;
  displayRiserve = false;
  displayInvalidita = false;

  aventeFigli = false;

  ngOnInit() {
    /*this.domandaService.getDomanda().subscribe(
      (domanda: DomandaObj) => {

        let d = domanda.domanda;

        this.md.get('fi').patchValue(
          {
            istitutoFrequentato: '',
            tipoDiploma: '',
            provinciaIstituto: '',
            comuneIstituto: '',
            viaIstituto: '',
            annoDiploma: '',
          }
        );

        this.md.get('fl').patchValue(
          {
            linguaSelezionata: ''
          }
        );


        if (domanda.TitoliPreferenziali.length > 0) {
          this.md.get('tp').patchValue(
            {
              titoliSelezionati: domanda.TitoliPreferenziali,
            }
          );

          if (domanda.NumeroFigli !== '' && domanda.NumeroFigli !== null) {
            this.aventeFigli = true;
            this.md.get('tp').patchValue(
              {
                numeroFigliSelezionati: domanda.NumeroFigli,
              }
            );
          }

          this.displayTitoli = true;

        }

        if (domanda.Riserve.length > 0) {
          this.md.get('fr').patchValue(
            {
              riserveSelezionate: domanda.Riserve,
            }
          );

          this.displayRiserve = true;
        }


        if (domanda.Invalidita.enteInvalidita !== '' && domanda.Invalidita.enteInvalidita !== null) {
          this.displayInvalidita = true;
          this.md.get('fc').patchValue(
            {
              percInvalidita: domanda.Invalidita.prcInvalidita,
              dataCertificazione: domanda.Invalidita.dataInvalidita,
              invaliditaEnte: domanda.Invalidita.enteInvalidita,
              ausiliProva: domanda.Invalidita.ausProva,
              tempiAggiuntiviProva: domanda.Invalidita.tmpAggiuntivi,
              esenzioneProvaSelettiva: domanda.Invalidita.eszProva,
            }
          );

        }

      }
    );*/

  }

  constructor(private formBuilder: FormBuilder, private domandaService: DomandaService) {
    this.md = this.formBuilder.group({
      fi: this.formBuilder.group({
        istitutoFrequentato: [''],
        tipoDiploma: [''],
        provinciaIstituto: [''],
        comuneIstituto: [''],
        viaIstituto: [''],
        annoDiploma: [''],
      }),
      fl: this.formBuilder.group({
        linguaSelezionata: [''],
      }),
      ft: this.formBuilder.group({
        numeroFigliSelezionati: [[]],
      }),
      tp: this.formBuilder.group({
        titoliSelezionati: [[]],
        numeroFigliSelezionati: [''],
      }),
      fr: this.formBuilder.group({
        riserveSelezionate: [[]],
      }),
      fc: this.formBuilder.group({
        percInvalidita: [''],
        dataCertificazione: [''],
        invaliditaEnte: [''],
        ausiliProva: [''],
        tempiAggiuntiviProva: [''],
        esenzioneProvaSelettiva: [''],
      }),
    });
  }


  get istitutoFrequentato() {
    return this.md.get('fi.istitutoFrequentato');
  }

  get tipoDiploma() {
    return this.md.get('fi.tipoDiploma');
  }

  get provinciaIstituto() {
    return this.md.get('fi.provinciaIstituto');
  }

  get provinceDropdown() {
    return this.md.get('fi.provinceDropdown');
  }

  get comuneIstituto() {
    return this.md.get('fi.comuneIstituto');
  }

  get comuniDropdown() {
    return this.md.get('fi.comuniDropdown');
  }

  get viaIstituto() {
    return this.md.get('fi.viaIstituto');
  }

  get annoDiploma() {
    return this.md.get('fi.annoDiploma');
  }


  get linguaSelezionata() {
    return this.md.get('fl.linguaSelezionata');
  }

  /* TITOLI */

  get titoliSelezionati() {
    return this.md.get('tp.titoliSelezionati');
  }

  get numeroFigliSelezionati() {
    return this.md.get('tp.numeroFigliSelezionati');
  }


  /* RISERVE */

  get riserveSelezionate() {
    return this.md.get('fr.riserveSelezionate');
  }

  /* CATEGORIE PROTETTE */


  get appartenenza() {
    return this.md.get('fc.appartenenza');
  }

  get percInvalidita() {
    return this.md.get('fc.percInvalidita');
  }

  get dataCertificazione() {
    return this.md.get('fc.dataCertificazione');
  }

  get invaliditaEnte() {
    return this.md.get('fc.invaliditaEnte');
  }

  get ausiliProva() {
    return this.md.get('fc.ausiliProva');
  }

  get tempiAggiuntiviProva() {
    return this.md.get('fc.tempiAggiuntiviProva');
  }

  get esenzioneProvaSelettiva() {
    return this.md.get('fc.esenzioneProvaSelettiva');
  }


}




