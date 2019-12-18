import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DomandaObj} from '../models';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {SidenavContainer, SidenavService} from './sidenav.service';

const domandaCacheBuster$ = new Subject<void>();


@Injectable({
  providedIn: 'root'
})
export class DomandaService {

  domandaobj: DomandaObj;
  isEditable: boolean;

  private testoMenuDomanda = new Subject<any>();
  private statoMiaDomanda = new Subject<any>();
  private displayMiaDomanda = new Subject<boolean>();

  constructor(private http: HttpClient, private d: DomandaObj, private sidenavService: SidenavService) {
    this.domandaobj = d;
    this.isEditable = false;
  }

  sendDisplayAction(should: boolean) {
    this.displayMiaDomanda.next(should);
  }

  getDisplayMiaDomanda() {
    return this.displayMiaDomanda.asObservable();
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
          this.isEditable = this.domandaobj.operazione === 1;

          if (response.operazione === 0) {
            this.removeNullableField();
          }
          const obj: SidenavContainer = {
            dataInvio: this.domandaobj.domanda.dataInvio,
            ultimaModifica: this.domandaobj.domanda.dataModifica,
            stato: this.domandaobj.operazione
          };

          this.sidenavService.updateContainer(obj);
          return response;
        }  ),
      );
  }

  getFreshDomanda(): Observable<DomandaObj> {
    return this.http.get<DomandaObj>(environment.endpoint.domanda).pipe(
      map( (response: DomandaObj) => {
        this.domandaobj = response;

        const obj: SidenavContainer = {
          dataInvio: this.domandaobj.domanda.dataInvio,
          ultimaModifica: this.domandaobj.domanda.dataModifica,
          stato: this.domandaobj.operazione
        };

        this.sidenavService.updateContainer(obj);

        return response;
      })
    );
  }

  @CacheBuster({
    cacheBusterNotifier: domandaCacheBuster$
  })
  postDomanda(domanda) {
    return this.http.post(environment.endpoint.salvaDomanda, domanda);
  }


  // Rimuovo null dagli oggetti con figli per poterci accedere
  removeNullableField() {
    this.domandaobj.domanda.titoloStudioPosseduto =  {
      indirizzo: {
        id: '',
        desc: ''
      },
      indirizzoIstituto: '',
      dataConseguimento: '',
      istituto: '',
      titolo: {
        desc: '',
        id: ''
      },
      tipologia: {
        id: '',
        desc: ''
      },
      luogoIstituto: {
        codiceProvincia: '',
        nome: '',
        codice: ''
      },
      altroIndirizzoTitoloStudio: '',
    };
  }
}


