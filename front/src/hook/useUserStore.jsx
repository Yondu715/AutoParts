import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../core/store/UserStore/UserSlice";


export function useValidate() {
    const dispatch = useDispatch();

    const signIn = (isAuth, login, role) => {
        const vadidateInfo = {
            isAuth: isAuth,
            login: login,
            role: role,
        }
        dispatch(logIn(vadidateInfo))
    }

    const signOut = () => dispatch(logOut());

    return { signIn, signOut };
}

export function useUserInfo() {
    return useSelector(state => state.user.user);
}

export function useUserLogin() {
    return useSelector(state => state.user.user.login);
}