import * as userActions from "../actions/user.actions";
import { userReducer } from "./user.reducer";
import { User } from "../../models/user.model";

describe('userReducer', () => {
    describe('loadUserAction', () => {
        it('should load all Users', () => {
            const user = new User();
            user._id = '1';
            user.name = 'foo'
            const currentState = [];

            const expectedResult = [
                user,
            ];

            const action = new userActions.LoadUsersSuccessAction([
                user,
            ]);
            const result = userReducer(currentState, action);

            expect(result).toEqual(expectedResult);

        });
    });
    
    describe('saveUserAction', () => {
        it('user should be created', () => {
            const newUser = new User();
            newUser._id = '1';
            newUser.name = 'foo'

            const currentState = [];

            const expectedResult = [
                newUser,
            ]

            const action = new userActions.SaveUserSuccessAction(newUser);
            const result = userReducer(currentState, action)
            expect(result).toEqual(expectedResult);
        });
    });

    describe('updateUserAction', () => {
        it('user should be edited', () => {
            const user = new User();
            user._id = '1';
            user.name = 'foo'

            const userEdited = new User();
            userEdited._id = '1';
            userEdited.name = 'bar'

            const currentState = [
                user,
            ];

            const expectedResult = [
                userEdited,
            ]

            const action = new userActions.UpdateUserSuccessAction(userEdited);
            const result = userReducer(currentState, action)
            expect(result).toEqual(expectedResult);
        });
    });

    describe('updateUserAction', () => {
        it('user should be edited', () => {
            const user = new User();
            user._id = '1';
            user.name = 'foo'

            const currentState = [
                user,
            ];

            const expectedResult = []

            const action = new userActions.DeleteUsersSuccessAction(user._id);
            const result = userReducer(currentState, action)
            expect(result).toEqual(expectedResult);
        });
    });
});
