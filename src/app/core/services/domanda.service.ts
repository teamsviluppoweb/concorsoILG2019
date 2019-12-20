import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DomandaObj} from '../models';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {SidenavDati, SidenavService} from './sidenav.service';

const domandaCacheBuster$ = new Subject<void>();


@Injectable({
  providedIn: 'root'
})
export class DomandaService {

  domandaobj: DomandaObj;
  isEditable = false;
  isReadonly: boolean;

  constructor(private http: HttpClient, private sidenavService: SidenavService) {
    this.isEditable = false;
  }

  /** Fa il cache di di getDomanda e lo salva in domandaCacheBuster **/
  @Cacheable({
    cacheBusterObserver: domandaCacheBuster$
  })
  getDomanda(): Observable<DomandaObj> {
    return this.http.get<DomandaObj>(environment.endpoint.domanda)
      .pipe(
        map( (response: DomandaObj) => {

          this.domandaobj = response;
          this.isEditable = this.domandaobj.operazione === 1;

          const obj: SidenavDati = {
            dataPrimoInvio: this.domandaobj.domanda.dataInvio,
            dataUltimaModifica: this.domandaobj.domanda.dataModifica,
            stato: this.domandaobj.operazione
          };

          this.sidenavService.aggiornaDati(obj);
          return response;
        }  ),
      );
  }


  /** Il cachebuste pulisce la cache di getDomanda di pulire la cache **/
  @CacheBuster({
    cacheBusterNotifier: domandaCacheBuster$
  })
  postDomanda(domanda) {
    return this.http.post(environment.endpoint.salvaDomanda, domanda);
  }




}


