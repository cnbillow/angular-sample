
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './user.reducers';

export interface UserManagementState {
    users: fromUsers.UserState;
}

export const reducers: ActionReducerMap<UserManagementState> = {
    users: fromUsers.reducer,
};

export const getUserManagement = createFeatureSelector<UserManagementState>(
    'user-management'
);

// user state

export const getUserState = createSelector(
    getUserManagement,
    (state: UserManagementState) => state.users
);

export const getAllUsers = createSelector(
    getUserState,
    fromUsers.getUsers,
);
