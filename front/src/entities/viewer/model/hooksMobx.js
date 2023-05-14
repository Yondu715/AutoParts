import { useEffect, useState } from "react";
import { autorun } from "mobx";
import { authUserAsyncFx, mobxStore, regUserAsyncFx } from "./store/mobx";

export function useModel() {
    const signIn = (userInfo) => {
        mobxStore.setSession(userInfo);
    }

    const signOut = () => {
        localStorage.clear();
        mobxStore.removeSession();
    };

    const authUserAsync = (user, callback) => {
        authUserAsyncFx(user, callback);
        
    }

    const regUserAsync = (user, callback) => {
        regUserAsyncFx(user, callback);
    }

    return { signIn, signOut, authUserAsync, regUserAsync };
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