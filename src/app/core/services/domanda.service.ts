import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DomandaObj} from '../models';
import {Cacheable, CacheBuster} from 'ngx-cacheable';

const domandaCacheBuster$ = new Subject<void>();


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


  @Cacheable({
    cacheBusterObserver: domandaCacheBuster$
  })
  getDomanda(): Observable<DomandaObj> {
    return this.http.get<DomandaObj>(environment.endpoint.domanda)
      .pipe(
        map( (response: DomandaObj) => {
          this.domandaobj = response;
          console.log(this.domandaobj);
          return response;
        }  ),
      );
  }

  @CacheBuster({
    cacheBusterNotifier: domandaCacheBuster$
  })
  postDomanda(domanda) {
    return this.http.post(environment.endpoint.salvaDomanda, domanda);
  }


}


