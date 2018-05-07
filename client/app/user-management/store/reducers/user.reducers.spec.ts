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

            const expectedResult = {
                data: [
                    user,
                ],
                loaded: true,
                loading: false,
            };

            const action = new userActions.LoadUsersSuccess([
                user,
            ]);
            const result = reducer(currentState, action);

            expect(result.data).toEqual(expectedResult.data);
            expect(result.loaded).toEqual(true);

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

            const expectedResult = {
                data: [
                    newUser,
                ]
            };


            const action = new userActions.SaveUserSuccess(newUser);
            const result = reducer(currentState, action);
            expect(result.data).toEqual(expectedResult.data);
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

            const expectedResult = {
                data: [
                    userEdited,
                ]
            };

            const action = new userActions.UpdateUserSuccess(userEdited);
            const result = reducer(currentState, action);
            expect(result.data).toEqual(expectedResult.data);
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

            const expectedResult = {
                data: [],
            };
            const action = new userActions.DeleteUserSuccess(user._id);
            const result = reducer(currentState, action);
            expect(result.data).toEqual(expectedResult.data);
        });
    });
});
