import { Reducer, Action, ActionCreator } from "redux";
import { batch } from "react-redux";
import { TAction, TDispatch, Tweet, TweetsState } from "../../types";
import { URL } from "../../lib/constants";

// action types
export enum TWEETS {
    GET_TWEETS = "GET_TWEETS",
    GET_TWEETS_ERROR = "GET_TWEETS_ERROR",
    LOADING_TWEETS_START = "LOADING_TWEETS_START",
    LOADING_TWEETS_END = "LOADING_TWEETS_END"
}

// reducer
const initialState: TweetsState = {
  tweets: [],
  isLoading: false,
};

export const tweetsReducer: Reducer<TweetsState> = (state = initialState, action) => {
  switch (action.type) {
    case TWEETS.GET_TWEETS: {
      const { payload } = action;
      return {
        ...state,
        tweets: [...payload],
      };
    }
    case TWEETS.GET_TWEETS_ERROR: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    }
    case TWEETS.LOADING_TWEETS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TWEETS.LOADING_TWEETS_END: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

// action
const getTweetsSuccess: ActionCreator<Action> = (products: Tweet[]) => ({ type: TWEETS.GET_TWEETS, payload: products });
const getTweetsError: ActionCreator<Action> = (error: Error) => ({ type: TWEETS.GET_TWEETS_ERROR, payload: error });
const startLoading: ActionCreator<Action> = () => ({ type: TWEETS.LOADING_TWEETS_START });
const endLoading: ActionCreator<Action> = () => ({ type: TWEETS.LOADING_TWEETS_END });

export const getTweets = (URL: URL): TAction => 
        (dispatch: TDispatch): void => {
  dispatch(startLoading());

   fetch(URL)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);

      return response;
    })
    .then((response) => response.json())
    .then((data) => {
      batch(() => {
        dispatch(endLoading());
        dispatch(getTweetsSuccess(data));
      });
    })
    .catch((error) => {
      batch(() => {
        dispatch(endLoading());
        dispatch(getTweetsError(error));
      });
    });
};