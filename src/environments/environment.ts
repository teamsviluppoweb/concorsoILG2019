
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  enableTracing: true,

  localIp: 'pc39548.dipvvf.it',
  hostredirect: 'https://pc39548.dipvvf.it:4200/',
  endpoint: {
    domanda: 'http://localhost:8080/GetDomanda',
    salvaDomanda: 'http://localhost:8080/SalvaDomanda',
    titoli: 'http://localhost:8080/TitoliPreferenziali',
    riserve: 'http://localhost:8080/Riserve',
    lingue: 'http://localhost:8080/Lingue',
    province: 'http://localhost:8080/Province',
    comuni: 'http://localhost:8080/Province/',
    tipologia: 'http://localhost:8080/TitoliStudio/Tipologie',
    titolo: 'http://localhost:8080/TitoliStudio/titoli/',
    indirizzi: 'http://localhost:8080/TitoliStudio/indirizzi/',
    infoConcorso: 'http://localhost:8080/info',
    pathSpidLogin: 'https://sso.vigilfuoco.it/cas-test/login?service=https://localhost:8080/testjwt/',
    pathSpidLogout: 'https://sso.vigilfuoco.it/cas-test/logout?service=https://localhost:8080/testjwt/'
  }
};
