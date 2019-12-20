import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Logger} from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portale-Gestione-Domande';
  isLoading = true;
  constructor() {
  }

  ngOnInit() {
    if (environment.production) {
      Logger.enableProductionMode();
    }
  }


}
