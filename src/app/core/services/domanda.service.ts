import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { map, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DomandaObj} from '../models';


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

  private testoMenuDomanda = new Subject<any>();
  private statoMiaDomanda = new Subject<any>();

  constructor(private http: HttpClient, private d: DomandaObj) {
    this.domandaobj = d;
  }

  sendMessage(message: string) {
    this.testoMenuDomanda.next({ text: message });
  }

  sendStato(message: boolean) {
    this.statoMiaDomanda.next({ text: message });
  }



  getDomanda(): Observable<DomandaObj> {
    const options = createHttpOptions(true);
    return this.http.get<DomandaObj>(environment.endpoint.domanda, options)
      .pipe(
        map( (response: DomandaObj) => {
          this.domandaobj = response;
          console.log(this.domandaobj);
          return response;
        }  ),
      );
  }

  putDomanda(domanda) {
    this.domandaobj.domanda.stato = 1;
    return this.http.put(environment.endpoint.salvaDomanda, domanda).pipe(
      tap(() => console.log('domanda puttata'))
    );
  }


}


