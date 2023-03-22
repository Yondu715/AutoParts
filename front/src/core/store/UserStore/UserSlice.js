import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    login: null,
    role: null
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: initialState
    },
    reducers: {
        logIn(state, action) {
            state.user.isAuth = action.payload.isAuth;
            state.user.login = action.payload.login;
            state.user.role = action.payload.role;
        },
        logOut(state) {
            state.user = initialState;
        }
    }
});

export const {logIn, logOut} = userSlice.actions;
export const userReducer = userSlice.reducer;