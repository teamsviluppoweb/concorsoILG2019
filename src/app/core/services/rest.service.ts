import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  Comune,
  Lingua,
  Riserva,
  TipologiaTitoloStudio,
  TitoliTitoloIndirizzo,
  TitoliTitoloStudio,
  TitoloPreferenziale
} from '../models/rest/rest-interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }


  getTitoliPreferenziali(): Observable<TitoloPreferenziale[]> {
    return this.http.get<TitoloPreferenziale[]>(environment.endpoint.titoli);
  }

  getLingueStraniere(): Observable<Lingua[]> {
    return this.http.get<Lingua[]>(environment.endpoint.lingue);
  }

  getRiserve(): Observable<Riserva[]> {
    return this.http.get<Riserva[]>(environment.endpoint.riserve);
  }

  getProvince() {
    return this.http.get(environment.endpoint.province);
  }

  getComuni(provincia: string): Observable<Comune[]>  {
    return this.http.get<Comune[]>(environment.endpoint.comuni);
  }

  getTipologiaTitoloStudio() {
    return this.http.get(environment.endpoint.tipologia);
  }

  getTitoliTitoloStudio(id: string): Observable<TitoliTitoloStudio[]>  {
    return this.http.get<TitoliTitoloStudio[]>(environment.endpoint.titolo + id);
  }

  getIndirizziTitoliStudio(id: string): Observable<TitoliTitoloIndirizzo[]>  {
    return this.http.get<TitoliTitoloIndirizzo[]>(environment.endpoint.indirizzi + id);
  }

}
