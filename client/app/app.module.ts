import { NgModule, PLATFORM_ID, APP_ID, Inject  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MatToolbarModule } from '@angular/material/toolbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// You can get runtime information about the current platform and the appId by injection.

import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects'
import { UserEffects } from './state/effects/user.effects';
import { UsersService } from './users/users.service';

import { StoreDevtoolsModule } from '@ngrx/store-devtools'
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatToolbarModule,
    BrowserModule.withServerTransition({appId: 'angular-sample'}),
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppRoutingModule,
    StoreModule.forRoot({users: userReducer}),
    EffectsModule.forRoot([UserEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
      const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
      console.log(`Running ${platform} with appId=${appId}`);
  }
 }
