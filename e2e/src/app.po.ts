import { browser, by, element } from 'protractor';

export class AppPage {
  loginWithToken() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkZW1vIiwiaWF0IjoxNTc2OTM3NjgxLCJleHAiOjE1NzY5Njc2ODF9.Qdm1LKQksA8mhuZdhEA9pG-kk1zzVx5n7IT3TvI0T8A';
    return browser.get(browser.baseUrl + '?ticket=' + token) as Promise<any>;
  }

  ApplicationFormUrl() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
}
