import { makeAutoObservable } from "mobx"

const initialState = {
    isAuth: false,
    login: null,
    role: null
}

export const mobxStore = makeAutoObservable({
    viewer: {
        ...initialState
    },
    logIn: ({ isAuth, login, role }) => {
        mobxStore.viewer = {
            isAuth: isAuth,
            login: login,
            role: role
        }
    },
    logOut: () => {
        mobxStore.viewer = {
            ...initialState
        }
    }
});