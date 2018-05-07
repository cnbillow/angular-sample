import * as userActions from '../actions/user.actions';
import { User } from '../../models/user.model';

export interface UserState {
  data: User[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: userActions.Action) {
  switch (action.type) {
    case userActions.SET_USERS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        data: action.payload
      };
    }
    case userActions.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        data: action.payload
      };
    }
    case userActions.SAVE_USER_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    }
    case userActions.UPDATE_USER_SUCCESS: {
      const userIndex = state.data.findIndex((user: User) => {
        return user._id === action.payload._id;
      });
      return {
        ...state,
        data: Object.assign([], state.data, { [userIndex]: action.payload })
      };
    }
    case userActions.DELETE_USER_SUCCESS: {
      return {
        ...state,
        data: state.data.filter((user) => user._id !== action.payload)
      };
    }
    default: {
      return state;
    }
  }
}

export const getUsers = (state: UserState) => state.data;
