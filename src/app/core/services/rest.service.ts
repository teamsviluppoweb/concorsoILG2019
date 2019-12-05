import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comune, Lingua, Riserva, TipologiaTitoloStudio, TitoloPreferenziale} from '../models/rest/rest-interface';
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

  getTipologiaTitoloStudio(): Observable<TipologiaTitoloStudio[]>  {
    return this.http.get<TipologiaTitoloStudio[]>(environment.endpoint.tipologia);
  }

}
