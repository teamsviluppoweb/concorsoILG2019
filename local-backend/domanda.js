var data = {
 domanda: domandaRest,
  errore: 'no',
  operazione: 1
}

let domandaRest = {
  id: '1',
  idDomanda: '1',
  versione: 1,
  stato: 1,
  istanzaJSON: '',
  dataInvio: '12/12/1995',
  dataModifica: '12/12/1995',
  anagCandidato: anagrafica,
  titoloStudioPosseduto: titoliStudio,
  lingua: null,
  lstRiserve: [],
  lstTitoliPreferenziali: [],
  numFigli: 0,
  invaliditaCivile: null,
}

let anagrafica = {
    codiceFiscale: 'TRTRRERERRE',
    cognome: 'Turturica',
    nome: 'Robert',
    dataNascita: '02/12/1995',
    comuneNascita: luogoNascita,
    residenza: 'Roma',
    telefono: '1111',
    email: 'mail@me.com'
}

let luogoNascita = {
    codice: 'H501',
    nome: 'Roma',
    codiceProvincia: 'RM'
}

let titoliStudio = {
    tipologia: null,
    titolo: null,
    indirizzo: null,
    dataConseguimento: null,
    istituto: null,
    luogoIstituto: null,
    indirizzoIstituto: null,
}


