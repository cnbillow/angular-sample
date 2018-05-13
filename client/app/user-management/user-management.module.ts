import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserAddEditComponent } from './components';

import * as fromUserComponents from './components';

import * as fromUserContainers from './containers';

import * as fromServices from './services';

import { reducers, effects } from './store';
import { NavBarModule } from '../../nav-bar/nav-bar.module';

@NgModule({
  imports: [
    NavBarModule,
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
})
export class UserManagementModule {
  constructor() {
    /**/
  }
}
