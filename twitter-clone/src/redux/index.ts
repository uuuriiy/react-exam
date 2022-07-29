import { createStore, applyMiddleware, combineReducers, Store, compose } from "redux";
import thunk from "redux-thunk";
import { tweetsReducer } from "./modules/tweets";
import { userReducer, saveUserToLocalStorage } from "./modules/user";
import { usersReducer } from "./modules/users";

const rootReducer = combineReducers({
  tweets: tweetsReducer,
  users: usersReducer,
  user: userReducer
});

export const store: Store = createStore(rootReducer, 
  compose(applyMiddleware(thunk), applyMiddleware(saveUserToLocalStorage)));
