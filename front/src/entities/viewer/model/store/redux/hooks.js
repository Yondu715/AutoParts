import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "./store";


export function useValidate() {
    const dispatch = useDispatch();

    const signIn = (isAuth, login, role) => {
        const validateInfo = {
            isAuth: isAuth,
            login: login,
            role: role,
        };
        dispatch(logIn(validateInfo));
    }

    const signOut = () => {
        localStorage.clear();
        dispatch(logOut());
    };

    return { signIn, signOut };
}

export function useUserInfo() {
    return useSelector(state => state.viewer.viewer);
}

export function useUserLogin() {
    return useUserInfo().login;
}
