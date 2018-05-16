import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BrowserTransferStateModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

// firebasse
import { AngularFireModule } from 'angularfire2';

// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// You can get runtime information about the current platform and the appId by injection.

import { environment } from '../environments/environment';

import { LoginModule } from './login/login.module';
import { AuthGuard } from './_guards/auth.guard';

/* tslint:disable-next-line */

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
  }
}
