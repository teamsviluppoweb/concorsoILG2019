import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {catchError, map, tap} from 'rxjs/operators';
import {forkJoin, Observable, of, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Domanda, DomandaObj, IntDomandaObj} from '../models';


export const searchUrl = 'http://localhost:8080/';


function createHttpOptions(refresh = false) {
  const params = new HttpParams();
  const headerMap = refresh ? {'x-refresh': 'true'} : {};
  const headers = new HttpHeaders(headerMap) ;
  return { headers, params };
}


@Injectable({
  providedIn: 'root'
})
export class DomandaService {

  domandaobj: DomandaObj;
  api = environment;
  statoDomanda;

  private testoMenuDomanda = new Subject<any>();
  private statoMiaDomanda = new Subject<any>();

  constructor(private http: HttpClient, private d: DomandaObj) {
    this.domandaobj = d;
    this.statoDomanda = false;
  }

  sendMessage(message: string) {
    this.testoMenuDomanda.next({ text: message });
  }

  sendStato(message: boolean) {
    this.statoMiaDomanda.next({ text: message });
  }



  getDomanda(): Observable<DomandaObj> {


    const options = createHttpOptions(true);
    return this.http.get<DomandaObj | Response>(this.api.endpoint.domanda, options)
      .pipe(
        tap((response: IntDomandaObj) => {

          this.domandaobj.domanda.anagCandidato = response.domanda.anagCandidato;
          this.domandaobj.domanda.titoliStudioPosseduti = response.domanda.titoliStudioPosseduti;
          this.domandaobj.domanda.lingua = response.domanda.lingua;
          this.domandaobj.domanda.lstTitoliPreferenziali = response.domanda.lstTitoliPreferenziali;
          this.domandaobj.domanda.lstRiserve = response.domanda.lstRiserve;
          this.domandaobj.domanda.invaliditaCivile = response.domanda.invaliditaCivile;
          this.domandaobj.domanda.numFigli = response.domanda.numFigli;
        }),
        map( (domanda) => domanda ),
      );
  }

  putDomanda(domanda) {
    this.domandaobj.domanda.stato = 1;
    return this.http.put(this.api.endpoint.domanda, domanda).pipe(
      tap(() => console.log('domanda puttata'))
    );
  }


  forkJoin() {
    return forkJoin(
      [
        this.getProvince(),
        this.getLingueStraniere(),
        this.getTitoliPreferenziali(),
        this.getRiserve(),
        this.getDomanda(),
      ]);
  }

}


