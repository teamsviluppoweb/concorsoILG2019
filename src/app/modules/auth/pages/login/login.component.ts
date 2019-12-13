import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pathSpidLogin: string;

  constructor() {
    this.pathSpidLogin = environment.endpoint.pathSpidLogin;
  }

  ngOnInit() {
  }

}
