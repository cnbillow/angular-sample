import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
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

import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';

import { StoreModule, MetaReducer } from '@ngrx/store';
/* import { userReducer } from './state/reducers/user.reducer';
 */
import { EffectsModule } from '@ngrx/effects';
/* import { UserEffects } from './state/effects/user.effects';
 */

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginModule } from './login/login.module';

/* tslint:disable-next-line */
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule.withServerTransition({ appId: 'angular-sample' }),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppRoutingModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
  }
}
