import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserManagementRoutingModule } from './user-management-routing.module';

import * as fromUserComponents from './components';
import { UserAddEditComponent } from './components';

import * as fromUserContainers from './containers';

import * as fromServices from './services';

import { reducers, effects } from './store';

@NgModule({
  imports: [
    UserManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StoreModule.forFeature('user-management', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromUserComponents.components,
    ...fromUserContainers.containers
  ],
  providers: [...fromServices.services],
  entryComponents: [UserAddEditComponent]
})
export class UserManagementModule {
  constructor() {
    /**/
  }
}
