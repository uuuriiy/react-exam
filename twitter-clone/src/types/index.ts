import { FieldValues } from "react-hook-form";
import { Action, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import sanitizeHtml from "sanitize-html";
import { FormTitle } from "../lib/constants";
import { PATH } from "../lib/routes";

// redux
export type TAction = ThunkAction<void, {}, {}, AnyAction>;
export type TDispatch = ThunkDispatch<{}, {}, AnyAction>;

// redux tweets
export interface Tweet {
    id: string;
    author_id: string;
    text: string;
}

export interface TweetsState {
    tweets: Tweet[];
    isLoading: boolean;
}

// redux users
export interface User {
    id: string;
    name: string;
    email: string;
}

export interface UsersState {
    users: User[];
}

// redux user
export interface UserState {
    user: User;
}

// middleware
export type Middleware<
  DispatchExt = {},
  S = any,
  D extends TDispatch = TDispatch
> = (store: S) => (next: D) => (action: Action) => TDispatch

// routes
export interface Routes {
    path: PATH;
    element: JSX.Element;
}

// inputs
export interface InputsProps {
    id: string;
    name: string;
    placeholder: string;
    type: string;
}

export type Inputs = {
    [prop: string]: InputsProps[];
};

// form props
export interface FormProps {
    title: FormTitle;
    inputProps: InputsProps[];
    submitHandler: ({email, password}: FieldValues) => void;
    validationSchema: object;
}

// validation
export interface LoginValidationSchema {
    email: string;
    password: string;
}

export interface SignUpValidationSchema {
    userName: string;
    fullName: string;
    email: string;
    password: string;
}

export type AddTweetValidationSchema = {
    tweet: string
}

// tweet
export type TweetProps = {
    tweet: Tweet
}

// sanitize
export type Sanitize = (dirty: string, options?: sanitizeHtml.IOptions | undefined) => {
    __html: string;
}