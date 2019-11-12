export const environment = {
  production: true,
  enableTracing: false,
  localIp: '192.168.1.152',
  hostredirect: '',
  endpoint: {
    titoli: 'http://webpc.dipvvf.it:5001/TitoliPreferenziali/Tutti',
    riserve: 'http://webpc.dipvvf.it:5001/riserve/iac',
    lingue: 'http://webpc.dipvvf.it:5001/lingue',
    province: 'http://webpc.dipvvf.it:5000/api/province',
    comuni: 'http://webpc.dipvvf.it:5000/api/comuni/prov/',
  },
};
