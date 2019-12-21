import {browser, by, element, logging} from 'protractor';
import {AppPage} from '../../app.po';
import {AnagraficaPo} from './anagrafica.po';



describe('workspace-anagrafica', () => {
  let page: AppPage;
  let anagrafica: AnagraficaPo;

  beforeEach(() => {
    anagrafica = new AnagraficaPo();
    page = new AppPage();
  });

  it('Expect cognome to be Rossi ', async () => {
    const cognome = anagrafica.anagraficaForm().cognome;
    expect(cognome).toEqual('Rossi');
  });

  it('Expect nome to be Mario', async () => {
    const nome = anagrafica.anagraficaForm().nome;
    expect(nome).toEqual('Mario');
  });

  it('Expect cf to be RSSMRA99D20F205R', async () => {
    const cf = anagrafica.anagraficaForm().codiceFiscale;
    expect(cf).toEqual('RSSMRA99D20F205R');
  });


  it('Expect data nascita to be 20/04/1999', async () => {
    const dataNascita = anagrafica.anagraficaForm().dataNascita;
    expect(dataNascita).toEqual('20/04/1999');
  });

  it('Expect cf to be RSSMRA99D20F205R', async () => {
    const cf = anagrafica.anagraficaForm().codiceFiscale;
    expect(cf).toEqual('RSSMRA99D20F205R');
  });

  it('Expect residenza to be Roma', async () => {
    const residenza = anagrafica.anagraficaForm().residenza;
    expect(residenza).toEqual('Roma');
  });

  it('Expect telefono to be 3203200022', async () => {
    const telefono = anagrafica.anagraficaForm().telefono;
    expect(telefono).toEqual('3203200022');
  });

  it('Expect mail to be mail@me.com', async () => {
    const email = anagrafica.anagraficaForm().email;
    expect(email).toEqual('mail@me.com');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
