import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {

    page = new AppPage();
  });

  it('Should display the application form', async () => {
    page.loginWithToken();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/#/apf/compila");
  });






  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
