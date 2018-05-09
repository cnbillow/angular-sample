import { User } from '../../models/user.model';
 /* tslint:disable */

export const LOAD_USERS = '[Users] Load Users';
export const LOAD_USERS_SUCCESS = '[Users] Load Users Success';
export const LOAD_USERS_FAIL = '[Users] Load Users Fail';
export const SAVE_USER = '[Users] Save User';
export const SAVE_USER_SUCCESS = '[Users] Save User Success';
export const SAVE_USER_FAIL = '[Users] Save User Fail';
export const UPDATE_USER = '[Users] Update User';
export const UPDATE_USER_SUCCESS = '[Users] Update User Success';
export const UPDATE_USER_FAIL = '[Users] Update User Fail';
export const DELETE_USER = '[Users] Delete Delete';
export const DELETE_USER_SUCCESS = '[Users] Delete User Success';
export const DELETE_USER_FAIL = '[Users] Delete User Fail';

export class LoadUsers {
    readonly type = LOAD_USERS;
    constructor(public payload: any = {}) {}
}

export class LoadUsersSuccess {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: User[]) {}
}

export class SaveUser {
    readonly type = SAVE_USER;
    constructor(public payload: User) {}
}

export class SaveUserSuccess {
    readonly type = SAVE_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class UpdateUser {
    readonly type = UPDATE_USER;
    constructor(public payload: User) {}
}

export class UpdateUserSuccess {
    readonly type = UPDATE_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class DeleteUser {
    readonly type = DELETE_USER;
    constructor(public payload: string) {}
}

export class DeleteUserSuccess {
    readonly type = DELETE_USER_SUCCESS;
    constructor(public payload: string) {}
}

export type Action = 
DeleteUser | DeleteUserSuccess |
LoadUsers | LoadUsersSuccess |
SaveUser | SaveUserSuccess |
UpdateUser | UpdateUserSuccess ;

