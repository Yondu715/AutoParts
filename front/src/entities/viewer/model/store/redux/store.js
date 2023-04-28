import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    id: null,
    login: null,
    role: null
}

const viewerSlice = createSlice({
    name: "viewer",
    initialState: {
        viewer: initialState
    },
    reducers: {
        setSession(state, action) {
            const { isAuth, login, role, id } = action.payload;
            state.viewer.isAuth = isAuth;
            state.viewer.login = login;
            state.viewer.role = role;
            state.viewer.id = id;
        },
        removeSession(state) {
            state.viewer = initialState;
        }
    }
});

export const { setSession, removeSession } = viewerSlice.actions;
export const viewerReducer = viewerSlice.reducer;