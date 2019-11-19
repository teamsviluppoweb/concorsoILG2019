import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoggingComponent} from '../components/messages/logging.component';
import {CommonModule} from '@angular/common';
import {SessionExpiredComponent} from '../components/session-expired/session-expired.component';
import {MenuSidenavComponent} from '../components/menu-sidenav/menu-sidenav.component';


@NgModule({
  declarations: [
    LoggingComponent,
    SessionExpiredComponent,
    MenuSidenavComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    LoggingComponent,
    SessionExpiredComponent,
    MenuSidenavComponent,
  ],
  entryComponents: [
    SessionExpiredComponent,
  ]
})
export class SharedModule { }
