import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../hook/useValidate";
import { Applications } from "./components/Applicatons/Applicatons";
import { Users } from "./components/Users/Users";

export function useAdmin() {
    const [logoutAnimation, setAnimation] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useValidate();
    const items = {
        "Заявки": <Applications />,
        "Пользователи": <Users />,
    }
    const initialItem = Object.keys(items)[0];
    const [currComp, setCurrComp] = useState(items[initialItem]);

    const logout = () => {
        setAnimation(true);
        setTimeout(() => {
            localStorage.clear();
            signOut();
            navigate("/auth");
        }, 800);
    }

    return {
        logoutAnimation, logout, items,
        setCurrComp, initialItem, currComp
    }
}