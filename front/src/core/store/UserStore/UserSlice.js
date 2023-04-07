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
            const { isAuth, login, role } = action.payload;
            state.user.isAuth = isAuth;
            state.user.login = login;
            state.user.role = role;
        },
        logOut(state) {
            state.user = initialState;
        }
    }
});

export const { logIn, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;