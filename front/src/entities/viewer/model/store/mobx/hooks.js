import { useEffect, useState } from "react";
import { autorun } from "mobx";
import { mobxStore } from ".";

export function useValidate() {
    const signIn = (isAuth, login, role, id) => {
        const vadidateInfo = {
            isAuth: isAuth,
            login: login,
            role: role,
            id: id
        };
        mobxStore.setSession(vadidateInfo);
    }

    const signOut = () => {
        localStorage.clear();
        mobxStore.removeSession();
    };

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
    return useUserInfo().login;
}

export function useUserId() {
    return useUserInfo().id;
}