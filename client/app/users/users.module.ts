import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';

import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
  ],
  declarations: [
    UsersComponent,
    UserListComponent,
    AddEditUserComponent,
  ],
  providers: [
    UsersService
  ],
  entryComponents: [AddEditUserComponent]
})
export class UsersModule {
  constructor() {
    console.log('UserModule');
  }
}
