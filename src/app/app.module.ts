import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule} from './shared/models/shared.module';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './modules/auth/auth.module';
import {CoreModule} from './core';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {NotFoundComponent} from './layouts/not-found/not-found.component';
import {DateAdapter} from '@angular/material';
import {SessionCheckServiceService} from './core/services/session-check-service.service';
import { MenuSidenavComponent } from './shared/components/menu-sidenav/menu-sidenav.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentLayoutComponent,
    AuthLayoutComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    // Authentication module
    AuthModule,
    // Core e Shared
    SharedModule,
    CoreModule,
    //  app
  ],
  providers: [SessionCheckServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  }
}
