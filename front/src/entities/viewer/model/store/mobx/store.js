import { makeAutoObservable } from "mobx"

const initialState = {
    isAuth: false,
    id: null,
    login: null,
    role: null
}

export const mobxStore = makeAutoObservable({
    viewer: {
        ...initialState
    },
    setSession: ({ isAuth, login, role, id }) => {
        mobxStore.viewer = {
            isAuth: isAuth,
            login: login,
            role: role,
            id: id
        }
    },
    removeSession: () => {
        mobxStore.viewer = {
            ...initialState
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