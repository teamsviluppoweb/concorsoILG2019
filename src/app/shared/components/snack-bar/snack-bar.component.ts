import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomandaService} from '../../../core/services/domanda.service';
import { DomandaObj} from '../../../core/models';
import {SidenavContainer, SidenavService} from '../../../core/services/sidenav.service';
import {globalRoutes} from '../../routes/global-routes';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class  SnackBarComponent implements OnInit {



  ngOnInit() {
  }




}
