import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {catchError, map, tap} from 'rxjs/operators';
import {forkJoin, Observable, of, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Comuni, Domanda, Lingue, Province, Riserve, Titoli} from '../models';


export const searchUrl = 'http://localhost:8080/';


function createHttpOptions(refresh = false) {
  const params = new HttpParams()
  const headerMap = refresh ? {'x-refresh': 'true'} : {};
  const headers = new HttpHeaders(headerMap) ;
  return { headers, params };
}


@Injectable({
  providedIn: 'root'
})
export class DomandaService {

  domanda: Domanda;
  /* In base alla configurationa assegnata gli endpoint cambieranno */
  api = environment;
  statoDomanda;

  private testoMenuDomanda = new Subject<any>();
  private statoMiaDomanda = new Subject<any>();

  constructor(private http: HttpClient, private d: Domanda) {
    this.domanda = d;
    this.statoDomanda = false;
  }

  sendMessage(message: string) {
    this.testoMenuDomanda.next({ text: message });
  }

  sendStato(message: boolean) {
    this.statoMiaDomanda.next({ text: message });
  }

  clearMessages() {
    this.testoMenuDomanda.next();
  }

  clearStato() {
    this.statoMiaDomanda.next();
  }

  getMessage(): Observable<any> {
    return this.testoMenuDomanda.asObservable();
  }

  getStato(): Observable<any> {
    return this.statoMiaDomanda.asObservable();
  }

  getTitoliPreferenziali(): Observable<boolean | Titoli[]> {
    return this.http.get<Titoli[]>(this.api.endpoint.titoli)
      .pipe(
        catchError((err) => {
          console.log(err);
          if (err.status === 401) {
            return of(false);
          }
        }),
      );
  }

  getLingueStraniere(): Observable<Lingue[]> {
    return this.http.get<Lingue[]>(this.api.endpoint.lingue);
  }

  getRiserve(): Observable<Riserve[]> {
    return this.http.get<Riserve[]>(this.api.endpoint.riserve);
  }


  getProvince() {
    return this.http.get(this.api.endpoint.province)
      .pipe(map((value: Province) => {
        return value.table.map(ogg => ogg);
      }));
  }

  // Mappo i comuni e li riordino, in modo che durante la ricerca i comuni minori appaiano per primi

  getComuni(provincia: string) {
    return this.http.get(this.api.endpoint.comuni)
      .pipe(map((value: Comuni) => {
        return value.table
          .map(nome => nome.comune)
          .sort((a, b) => {
            return a.length - b.length;
          });
      }));
  }


  getDomanda(): Observable<Domanda | Response> {


    const options = createHttpOptions(true);
    return this.http.get<Domanda | Response>(this.api.endpoint.domanda, options)
      .pipe(
        tap((response: Domanda) => {
          this.domanda.DomandaConcorso = response.DomandaConcorso;
          this.domanda.Anagrafica = response.Anagrafica;
          this.domanda.TitoloDiploma = response.TitoloDiploma;
          this.domanda.Lingua = response.Lingua;
          this.domanda.TitoliPreferenziali = response.TitoliPreferenziali;
          this.domanda.Riserve = response.Riserve;
          this.domanda.Invalidita = response.Invalidita;
          this.domanda.NumeroFigli = response.NumeroFigli;

          if (response.DomandaConcorso.Stato === 1) {
            this.statoDomanda = true;
          }
        }),
        map( (domanda) => domanda ),
      );
  }

  putDomanda(domanda) {
    this.domanda.DomandaConcorso.Stato = 1;
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


