import { useState } from "react";
import { viewerModel } from "entities/viewer";

export function useWrapHeader(){
    const [logoutAnimation, setAnimation] = useState(false);
    const { signOut } = viewerModel.useValidate();
    const userLogin = viewerModel.useUserLogin();

    const logout = () => {
        setAnimation(true);
        setTimeout(() => {
            localStorage.clear();
            signOut();
        }, 800);
    }

    return {
        logoutAnimation,
        logout, userLogin
    }
}