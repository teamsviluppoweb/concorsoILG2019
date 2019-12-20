import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

export interface SidenavDati {
  dataPrimoInvio: string;
  dataUltimaModifica: string;
  stato: number;

}

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private objects = new Subject<any>();


  aggiornaDati(obj: SidenavDati) {
    this.objects.next(obj);
  }

  getContainer(): Observable<SidenavDati> {
    return this.objects.asObservable();
  }

}
