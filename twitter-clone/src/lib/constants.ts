import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { object, string, SchemaOf } from 'yup';
import { store } from '../redux';
import { AddTweetValidationSchema, Inputs, LoginValidationSchema, SignUpValidationSchema } from "../types";

// redux
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// url
export enum URL {
    tweets = 'http://localhost:3003/tweets',
    users = 'http://localhost:3003/users',
}

// form
export enum FormTitle {
  LOGIN = 'Log in',
  SIGNUP = 'Sign up'
}

// inputs
export const errorHandler = (error: string) => `${error.charAt(0).toUpperCase()}${error.slice(1)}`;

export const inputs: Inputs = {
  login: [
    {
      id: '1',
      name: 'email',
      placeholder: 'Email',
      type: 'email',
    },
     {
      id: '2',
      name: 'password',
      placeholder: 'Password',
      type: 'password',
    },
  ],
  signUp: [
    {
      id: '1',
      name: 'userName',
      placeholder: 'User name',
      type: 'text'
    },
     {
      id: '2',
      name: 'fullName',
      placeholder: 'Full name',
      type: 'text'
    },
     {
      id: '3',
      name: 'email',
      placeholder: 'Email',
      type: 'email',
    },
     {
      id: '4',
      name: 'password',
      placeholder: 'Password',
      type: 'password',
    },
  ],
}

export const loginValidationSchema: SchemaOf<LoginValidationSchema> = object().shape({
    email: string().email().required(),
    password: string().min(8).max(256).required()
});

export const signUpValidationSchema: SchemaOf<SignUpValidationSchema> = object().shape({
  userName: string().min(3).max(256).required(),
  fullName: string().min(1).max(512).required(),
  email: string().email().required(),
  password: string().min(8).max(256).required(),
});

export const addTweetValidationSchema: SchemaOf<AddTweetValidationSchema> = object().shape({
  tweet: string().min(1).max(143).required()
})