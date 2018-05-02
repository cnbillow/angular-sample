import { Injectable } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { Effect, Actions } from '@ngrx/effects';
import * as userActions from '../actions/user.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { User } from '../../models/user.model';

@Injectable()
export class UserEffects {
    constructor(
        private userService: UsersService,
        private actions$: Actions
    ) {}

    @Effect() loadUsers$ = this.actions$
    .ofType(userActions.LOAD_USERS)
    .switchMap((action: userActions.LoadUsersAction) => this.userService.get(action.payload)
        .map(users => 
            (new userActions.LoadUsersSuccessAction(users))
        )
    )

    @Effect() saveUser$ = this.actions$
    .ofType(userActions.SAVE_USER)
    .switchMap((action: userActions.SaveUserAction) => this.userService.save(action.payload)
        .map((user : User) => 
            (new userActions.SaveUserSuccessAction(user))
        )
    )

    @Effect() updateUser$ = this.actions$
    .ofType(userActions.UPDATE_USER)
    .switchMap((action: userActions.UpdateUserAction) => this.userService.update(action.payload)
        .map(() => 
            (new userActions.UpdateUserSuccessAction(action.payload))
        )
    )

    @Effect() deleteUser$ = this.actions$
    .ofType(userActions.DELETE_USER)
    .switchMap((action: userActions.DeleteUsersAction) => this.userService.delete(action.payload)
        .map(() => 
            (new userActions.DeleteUsersSuccessAction(action.payload))
        )
    )
}