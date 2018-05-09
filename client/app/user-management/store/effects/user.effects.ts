import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UserEffects {

  @Effect()
  public loadUsers$ = this.actions$.ofType(userActions.LOAD_USERS)
    .switchMap((action: userActions.LoadUsers) =>
      this.userService.get(action.payload))
    .map(
      (users) => {
        // this.userService.setToTransferState(users);
        return new userActions.LoadUsersSuccess(users);
      }
    );

  @Effect()
  public saveUser$ = this.actions$
    .ofType(userActions.SAVE_USER)
    .switchMap((action: userActions.SaveUser) =>
      this.userService.save(action.payload))
    .map((user: User) => new userActions.SaveUserSuccess(user));

  @Effect()
  public updateUser$ = this.actions$
    .ofType(userActions.UPDATE_USER)
    .switchMap((action: userActions.UpdateUser) =>
      this.userService.update(action.payload))
    .map((user: User) => new userActions.UpdateUserSuccess(user));

  @Effect()
  public deleteUser$ = this.actions$
    .ofType(userActions.DELETE_USER)
    .switchMap((action: userActions.DeleteUser) =>
      this.userService.delete(action.payload))
    .map((user: User) => new userActions.DeleteUserSuccess(user._id));

  constructor(private userService: UsersService, private actions$: Actions) { }
}
