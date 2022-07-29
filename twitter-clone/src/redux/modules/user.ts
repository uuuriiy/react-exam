import { Reducer, Action, ActionCreator, Middleware } from "redux";
import { TAction, TDispatch, User, UserState } from "../../types";
import { RootState, URL } from "../../lib/constants";

// action types
export enum USER {
    GET_USER = "GET_USER",
    GET_USER_ERROR = "GET_USER_ERROR",
}

// reducer
const initialState: UserState = {
  user: {} as User,
};

export const userReducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case USER.GET_USER: {
      const { payload } = action;
      return {
        ...state,
        user: payload,
      };
    }
    case USER.GET_USER_ERROR: {
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
const getUsersSuccess: ActionCreator<Action> = (user: User) => ({ type: USER.GET_USER, payload: user });
const getUsersError: ActionCreator<Action> = (error: Error) => ({ type: USER.GET_USER_ERROR, payload: error });

export const getUserByUserName = (URL: URL, userName: string): TAction => 
        (dispatch: TDispatch): void => {

   fetch(`${URL}/${userName}`)
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

// middleware
export const saveUserToLocalStorage: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (action.type === USER.GET_USER) {
    const { payload } = action;
    let dataForStorage = '{}';
    try {
      dataForStorage = JSON.stringify({
        user: payload
      });
    } catch(e) {
      console.log(e);
    }
    localStorage.setItem('user', dataForStorage);
  }

  return next(action);
};