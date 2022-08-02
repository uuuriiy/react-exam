import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { Routes } from "../types";

export enum PATH {
    HOME = '/home',
    LOGIN = '/',
    SIGNUP = '/signUp'
}

export const routes: Routes[] = [
    {
        path: PATH.HOME,
        element: <Home />,
    },
    {
        path: PATH.LOGIN,
        element: <Login />,
    },
    {
        path: PATH.SIGNUP,
        element: <SignUp />,
    }
]