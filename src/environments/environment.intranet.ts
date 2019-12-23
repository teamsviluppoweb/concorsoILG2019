
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
    domanda: '//webpc.dipvvf.it:8020/GetDomanda',
    salvaDomanda: '//webpc.dipvvf.it:8020/SalvaDomanda',
    titoli: '//webpc.dipvvf.it:8020/TitoliPreferenziali',
    riserve: '//webpc.dipvvf.it:8020/Riserve',
    lingue: '//webpc.dipvvf.it:8020/Lingue',
    province: '//webpc.dipvvf.it:8020/Province',
    comuni: '//webpc.dipvvf.it:8020/Province/',
    tipologia: '//webpc.dipvvf.it:8020//TitoliStudio/Tipologie',
    titolo: '//webpc.dipvvf.it:8020//TitoliStudio/titoli/',
    indirizzi: '//webpc.dipvvf.it:8020/TitoliStudio/indirizzi/',
    infoConcorso: '//webpc.dipvvf.it:8020/info/',
    pathSpidLogin: 'https://sso.vigilfuoco.it/cas-test/login?service=https://localhost:8080/testjwt/',
    pathSpidLogout: 'https://sso.vigilfuoco.it/cas-test/logout?service=https://localhost:8080/testjwt/',
    visualizzaDomanda: '//webpc.dipvvf.it:8020/visualizzadomanda'
  }
};
