import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  Comune, DomandaDinamica, InfoConorso,
  Lingua,
  Riserva,
  TitoliTitoloIndirizzo,
  TitoliTitoloStudio,
  TitoloPreferenziale
} from '../models/rest/rest-interface';
import {environment} from '../../../environments/environment';
import {Cacheable} from 'ngx-cacheable';
import {Logger} from './logger.service';


/**
Il decoratore @Cacheable si occupa solo del caching delle chiamate https
 */

@Injectable({
  providedIn: 'root'
})
export class RestService {
    log: Logger;
  constructor(private http: HttpClient) {
    const log = new Logger('RestService');

  }

  @Cacheable()
  getTitoliPreferenziali(): Observable<TitoloPreferenziale[]> {
    return this.http.get<TitoloPreferenziale[]>(environment.endpoint.titoli);
  }
  @Cacheable()
  getLingueStraniere(): Observable<Lingua[]> {
    return this.http.get<Lingua[]>(environment.endpoint.lingue);
  }

  @Cacheable()
  getRiserve(): Observable<Riserva[]> {
    return this.http.get<Riserva[]>(environment.endpoint.riserve);
  }

  @Cacheable()
  getProvince() {
    return this.http.get(environment.endpoint.province);
  }

  getComuni(provincia: string): Observable<Comune[]>  {
    return this.http.get<Comune[]>(environment.endpoint.comuni + provincia);
  }

  @Cacheable()
  getTipologiaTitoloStudio() {
    return this.http.get(environment.endpoint.tipologia);
  }

  @Cacheable()
  getTitoliTitoloStudio(id: string): Observable<TitoliTitoloStudio[]>  {
    return this.http.get<TitoliTitoloStudio[]>(environment.endpoint.titolo + id);
  }

  @Cacheable()
  getIndirizziTitoliStudio(id: string): Observable<TitoliTitoloIndirizzo[]>  {
    return this.http.get<TitoliTitoloIndirizzo[]>(environment.endpoint.indirizzi + id);
  }

  @Cacheable()
  getInfoConcorso(): Observable<InfoConorso>  {
    return this.http.get<InfoConorso>(environment.endpoint.infoConcorso);
  }

  getDomandaDinamica(): Observable<DomandaDinamica[]> {
    return this.http.get<DomandaDinamica[]>(environment.endpoint.visualizzaDomanda);
  }

}
