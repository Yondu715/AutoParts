import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    login: null,
    role: null
}

const viewerSlice = createSlice({
    name: "viewer",
    initialState: {
        viewer: initialState
    },
    reducers: {
        logIn(state, action) {
            const { isAuth, login, role } = action.payload;
            state.viewer.isAuth = isAuth;
            state.viewer.login = login;
            state.viewer.role = role;
        },
        logOut(state) {
            state.viewer = initialState;
        }
    }
});

export const { logIn, logOut } = viewerSlice.actions;
export const viewerReducer = viewerSlice.reducer;