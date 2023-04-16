import { useEffect, useState } from "react";
import { autorun } from "mobx";
import { mobxStore } from ".";

export function useValidate() {
    const signIn = (isAuth, login, role) => {
        const vadidateInfo = {
            isAuth: isAuth,
            login: login,
            role: role,
        }
        mobxStore.logIn(vadidateInfo);
    }

    const signOut = () => mobxStore.logOut();

    return { signIn, signOut };
}

export function useUserInfo() {
    const [userInfo, setUserInfo] = useState(mobxStore.viewer);
    useEffect(() => {
        function handle(userInfo) {
            setUserInfo(userInfo);
        }
        return autorun(() => {
            handle(mobxStore.viewer);
        })
    }, [])
    return userInfo;
}

export function useUserLogin() {
    const [login, setLogin] = useState(mobxStore.viewer.login);
    useEffect(() => {
        function handle(login) {
            setLogin(login);
        }
        return autorun(() => {
            handle(mobxStore.viewer.login);
        }, [])
    })
    return login;
}