import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

export interface SidenavContainer {
  dataInvio: string;
  ultimaModifica: string;
  stato: number;
}

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private objects = new Subject<any>();


  updateContainer(obj: SidenavContainer) {
    this.objects.next(obj);
  }

  getContainer(): Observable<SidenavContainer> {
    return this.objects.asObservable();
  }

  constructor() { }
}
