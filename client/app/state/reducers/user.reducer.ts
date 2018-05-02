import * as userActions from "../actions/user.actions";

export function userReducer(state= [], action: userActions.Action) {
    switch (action.type) {
        case userActions.LOAD_USERS_SUCCESS: {
            return action.payload;
        }
        case userActions.SAVE_USER_SUCCESS: {
            return [...state, action.payload];
        }
        case userActions.UPDATE_USER_SUCCESS: {
            const userIndex = state.findIndex((user) => {
                return user._id === action.payload._id;
            });
            return Object.assign([], state, {[userIndex]: action.payload});
        }
        case userActions.DELETE_USER_SUCCESS: {
            return state.filter(user => user._id !== action.payload)
        }
        default: {
            return state;
        }
    }
}
