import * as userActions from '../actions/user.actions';
import { reducer, UserState } from './user.reducers';
import { User } from '../../models/user.model';

describe('userReducer', () => {
    describe('loadUserAction', () => {
        it('should load all Users', () => {
            const user = new User();
            user._id = '1';
            user.name = 'foo';
            const currentState: UserState = {
                data: [],
                loaded: false,
                loading: false,
            };

            const expectedResult = [
                user,
            ];

            const action = new userActions.LoadUsersSuccess([
                user,
            ]);
            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);

        });
    });

    describe('saveUserAction', () => {
        it('user should be created', () => {
            const newUser = new User();
            newUser._id = '1';
            newUser.name = 'foo';

            const currentState: UserState = {
                data: [],
                loaded: false,
                loading: false,
            };

            const expectedResult = [
                newUser,
            ];

            const action = new userActions.SaveUserSuccess(newUser);
            const result = reducer(currentState, action);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('updateUserAction', () => {
        it('user should be edited', () => {
            const user = new User();
            user._id = '1';
            user.name = 'foo';

            const userEdited = new User();
            userEdited._id = '1';
            userEdited.name = 'bar';

            const currentState: UserState = {
                data: [user],
                loaded: false,
                loading: false,
            };

            const expectedResult = [
                userEdited,
            ];

            const action = new userActions.UpdateUserSuccess(userEdited);
            const result = reducer(currentState, action);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('deleteUserAction', () => {
        it('user should be deleted', () => {
            const user = new User();
            user._id = '1';
            user.name = 'foo';

            const currentState: UserState = {
                data: [user],
                loaded: false,
                loading: false,
            };

            const expectedResult = [];

            const action = new userActions.DeleteUserSuccess(user._id);
            const result = reducer(currentState, action);
            expect(result).toEqual(expectedResult);
        });
    });
});
