import { useDispatch, useSelector } from "react-redux";
import { setSession, removeSession } from "./store";


export function useValidate() {
    const dispatch = useDispatch();

    const signIn = (isAuth, login, role, id) => {
        const validateInfo = {
            isAuth: isAuth,
            login: login,
            role: role,
            id: id
        };
        dispatch(setSession(validateInfo));
    }

    const signOut = () => {
        localStorage.clear();
        dispatch(removeSession());
    };

    return { signIn, signOut };
}

export function useUserInfo() {
    return useSelector(state => state.viewer.viewer);
}

export function useUserLogin() {
    return useUserInfo().login;
}

export function useUserId(){
    return useUserInfo().id;
}
