import { useState } from "react";
import { useUserLogin, useValidate } from "../../../../hook/useUserStore";

export function useWrapHeader(){
    const [logoutAnimation, setAnimation] = useState(false);
    const { signOut } = useValidate();
    const userLogin = useUserLogin();

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