import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreModule } from '@ngrx/store';

import { UserManagementService } from './user-management.service';
import { UserManagementRoutingModule } from './user-management-routing.module';

import * as fromUserComponents from './components';

import * as fromUserContainers from './containers';

import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StoreModule.forFeature('user-management', reducers),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [
    ...fromUserComponents.components,
    ...fromUserContainers.containers,
  ],
  providers: [
    UsersService,
  ]
})
export class UserManagementModule {
  constructor() { /**/ }
}
