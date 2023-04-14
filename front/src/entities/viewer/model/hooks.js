import { useDispatch, useSelector } from "react-redux";
import { reduxStore } from "./store";

export function useValidate() {
    const dispatch = useDispatch();

    const signIn = (isAuth, login, role) => {
        const vadidateInfo = {
            isAuth: isAuth,
            login: login,
            role: role,
        }
        dispatch(reduxStore.logIn(vadidateInfo))
    }

    const signOut = () => dispatch(reduxStore.logOut());

    return { signIn, signOut };
}

export function useUserInfo() {
    return useSelector(state => state.viewer.viewer);
}

export function useUserLogin() {
    return useSelector(state => state.viewer.viewer.login);
}