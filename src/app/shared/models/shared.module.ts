import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LoggingComponent} from '../components/messages/logging.component';
import {CommonModule} from '@angular/common';
import {MenuSidenavComponent} from '../components/menu-sidenav/menu-sidenav.component';
import {CustomDatePipe} from '../pipes/custom-date.pipe';
import {StatoDomandaPipe} from '../pipes/stato-domanda.pipe';
import {InfoAzioneDomandaPipe} from '../pipes/info-azione-domanda.pipe';
import {DataConseguimentoPipe} from '../pipes/data-conseguimento.pipe';
import {ToolbarIconStatePipe} from '../pipes/toolbar-icon-state.pipe';
import {SnackBarComponent} from '../components/snack-bar/snack-bar.component';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [
    LoggingComponent,
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
    NgxSpinnerModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    LoggingComponent,
    MenuSidenavComponent,
    CustomDatePipe,
    StatoDomandaPipe,
    InfoAzioneDomandaPipe,
    DataConseguimentoPipe,
    ToolbarIconStatePipe,
    SnackBarComponent,
    NgxSpinnerModule,
  ],
  entryComponents: [
    SnackBarComponent,
  ]
})
export class SharedModule { }
