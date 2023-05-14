import { useDispatch, useSelector } from "react-redux";
import { setSession, removeSession, authUserAsyncFx, regUserAsyncFx } from "./store/redux";


export function useModel() {
    const dispatch = useDispatch();

    const signIn = (userInfo) => {
        dispatch(setSession(userInfo));
    }

    const signOut = () => {
        localStorage.clear();
        dispatch(removeSession());
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
    return useSelector(state => state.viewer);
}

export function useUserLogin() {
    return useUserInfo().login;
}

export function useUserId(){
    return useUserInfo().id;
}
