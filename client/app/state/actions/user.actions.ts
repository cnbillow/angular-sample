import { User } from "../../models/user.model";

export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const SAVE_USER = 'SAVE_USERS';
export const SAVE_USER_SUCCESS = 'SAVE_USERS_SUCCESS';
export const UPDATE_USER = 'UPDATE_USERS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USERS_SUCCESS';
export const DELETE_USER = 'DELETE_USERS';
export const DELETE_USER_SUCCESS = 'DELETE_USERS_SUCCESS';

export class LoadUsersAction {
    readonly type = LOAD_USERS;
    constructor(public payload: any = {}) {}
}

export class LoadUsersSuccessAction {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: User[]) {}
}

export class SaveUserAction {
    readonly type = SAVE_USER;
    constructor(public payload: User) {}
}

export class SaveUserSuccessAction {
    readonly type = SAVE_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class UpdateUserAction {
    readonly type = UPDATE_USER;
    constructor(public payload: User) {}
}

export class UpdateUserSuccessAction {
    readonly type = UPDATE_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class DeleteUsersAction {
    readonly type = DELETE_USER;
    constructor(public payload: string) {}
}

export class DeleteUsersSuccessAction {
    readonly type = DELETE_USER_SUCCESS;
    constructor(public payload: string) {}
}

export type Action = 
LoadUsersAction | LoadUsersSuccessAction |
SaveUserAction | SaveUserSuccessAction |
UpdateUserAction | UpdateUserSuccessAction |
DeleteUsersAction | DeleteUsersSuccessAction;