// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  enableTracing: true,
  localIp: 'localhost',
  hostredirect: 'https://localhost:4300/',

  endpoint: {
    domanda: 'http://localhost:8080/domanda',
    salvaDomanda: 'http://webpc.dipvvf.it:8020/SalveDomanda',
    titoli: 'http://webpc.dipvvf.it:8020/TitoliPreferenziali',
    riserve: 'http://webpc.dipvvf.it:8020/Riserve',
    lingue: 'http://webpc.dipvvf.it:8020/Lingue',
    province: 'http://webpc.dipvvf.it:8020/Province',
    comuni: 'http://webpc.dipvvf.it:8020/Province',
    tipologia: 'http://webpc.dipvvf.it:8020//TitoliStudio/Tipologie',
    titolo: 'http://webpc.dipvvf.it:8020//TitoliStudio/titoli/',
    indirizzi: 'http://webpc.dipvvf.it:8020//TitoliStudio/indirizzi/',
  }
};

