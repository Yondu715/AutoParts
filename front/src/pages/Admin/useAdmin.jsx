import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../hook/useValidate";


export function useAdmin() {
    const [logoutAnimation, setAnimation] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useValidate();

    const menuItems = {
        "Заявки": "applications",
        "Пользователи": "users",
    }

    

    const logout = () => {
        setAnimation(true);
        setTimeout(() => {
            localStorage.clear();
            signOut();
            navigate("/auth");
        }, 800);
    }

    return {
        logoutAnimation, logout,
        menuItems
    }
}