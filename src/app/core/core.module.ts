import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthGuard, NoAuthGuard} from './guards';
import {throwIfAlreadyLoaded} from './guards/module-import.guard';
import {TokenInterceptor, LoggingInterceptor} from './interceptors';
import {HttpErrorHandler, MessageService} from './services';
import {VisualizzaDomandaGuard} from './guards/visualizza-domanda.guard';


@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    MessageService,
    VisualizzaDomandaGuard,
    HttpErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }

  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
