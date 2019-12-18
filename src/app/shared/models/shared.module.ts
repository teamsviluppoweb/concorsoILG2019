import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoggingComponent} from '../components/messages/logging.component';
import {CommonModule} from '@angular/common';
import {SessionExpiredComponent} from '../components/session-expired/session-expired.component';
import {MenuSidenavComponent} from '../components/menu-sidenav/menu-sidenav.component';
import {CustomDatePipe} from '../pipes/custom-date.pipe';
import {StatoDomandaPipe} from '../pipes/stato-domanda.pipe';
import {InfoAzioneDomandaPipe} from '../pipes/info-azione-domanda.pipe';
import {DataConseguimentoPipe} from '../pipes/data-conseguimento.pipe';
import {ToolbarIconStatePipe} from '../pipes/toolbar-icon-state.pipe';
import {SnackBarComponent} from '../components/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    LoggingComponent,
    SessionExpiredComponent,
    MenuSidenavComponent,
    CustomDatePipe,
    StatoDomandaPipe,
    InfoAzioneDomandaPipe,
    DataConseguimentoPipe,
    ToolbarIconStatePipe,
    SnackBarComponent,
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
    CustomDatePipe,
    StatoDomandaPipe,
    InfoAzioneDomandaPipe,
    DataConseguimentoPipe,
    ToolbarIconStatePipe,
    SnackBarComponent,
  ],
  entryComponents: [
    SessionExpiredComponent,
    SnackBarComponent,
  ]
})
export class SharedModule { }
