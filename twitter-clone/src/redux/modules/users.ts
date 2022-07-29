import { Reducer, Action, ActionCreator } from "redux";
import { TAction, TDispatch, User, UsersState } from "../../types";
import { URL } from "../../lib/constants";

// action types
export enum USERS {
    GET_USERS = "GET_USERS",
    GET_USERS_ERROR = "GET_USERS_ERROR",
}

// reducer
const initialState: UsersState = {
  users: [],
};

export const usersReducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {
    case USERS.GET_USERS: {
      const { payload } = action;
      return {
        ...state,
        users: [...payload],
      };
    }
    case USERS.GET_USERS_ERROR: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    }

    default:
      return state;
  }
};

// action
const getUsersSuccess: ActionCreator<Action> = (users: User[]) => ({ type: USERS.GET_USERS, payload: users });
const getUsersError: ActionCreator<Action> = (error: Error) => ({ type: USERS.GET_USERS_ERROR, payload: error });

export const getUsers = (URL: URL): TAction => 
        (dispatch: TDispatch): void => {

   fetch(URL)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);

      return response;
    })
    .then((response) => response.json())
    .then((data) => {
        dispatch(getUsersSuccess(data));
    })
    .catch((error) => {
        dispatch(getUsersError(error));
    });
};