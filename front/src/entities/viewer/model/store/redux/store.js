import { createSlice } from "@reduxjs/toolkit";
import { requestAPI } from "shared/api";

const initialState = {
    isAuth: false,
    id: null,
    login: null,
    role: null
}

const viewerSlice = createSlice({
    name: "viewer",
    initialState,
    reducers: {
        setSession(state, action) {
            const { isAuth, login, role, id } = action.payload;
            state.isAuth = isAuth;
            state.login = login;
            state.role = role;
            state.id = id;
        },
        removeSession() {
            return initialState;
        }
    }
});


export const authUserAsyncFx = async (user, callback) => {
    const response = await requestAPI.asyncAuth(user);
    const data = response.getBody();
    const status = response.getStatus();
    callback(status, data);
}

export const regUserAsyncFx = async (user, callback) => {
    const response = await requestAPI.asyncReg(user);
    const data = response.getBody();
    const status = response.getStatus();
    callback(status, data);
}

export const { setSession, removeSession } = viewerSlice.actions;
export const viewerReducer = viewerSlice.reducer;