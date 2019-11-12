import { Component } from '@angular/core';
import {MessageService} from '../../../core/services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']

})
export class LoggingComponent {
  token: string;
  tokenView = false;
  httpLogView = true;

  constructor(public messageService: MessageService) {}

  setToken() {
    localStorage.setItem('token', this.token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
