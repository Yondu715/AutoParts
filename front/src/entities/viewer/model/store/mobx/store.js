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