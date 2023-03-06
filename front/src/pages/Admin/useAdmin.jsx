import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useValidate } from "../../hook/useValidate";
import { ANY_ROUTE, APPLICATIONS_ROUTE, DEFAULT_PAGE_ROUTE, NOT_FOUND_ROUTE, USERS_ROUTE } from "../../utils/consts";
import { Applications } from "./components/Applicatons/Applicatons";
import { Users } from "./components/Users/Users";


export function useAdmin() {
    const [logoutAnimation, setAnimation] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useValidate();

    const menuItems = {
        "Заявки": APPLICATIONS_ROUTE,
        "Пользователи": USERS_ROUTE,
    }

    const routes = [
        {
            path: APPLICATIONS_ROUTE,
            element: <Applications />
        },
        {
            path: USERS_ROUTE,
            element: <Users />
        },
        {
            path: DEFAULT_PAGE_ROUTE,
            element: <Navigate to={APPLICATIONS_ROUTE} replace />
        },
        {
            path: ANY_ROUTE,
            element: <Navigate to={NOT_FOUND_ROUTE} replace />
        }
    ]

    

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
        menuItems, routes
    }
}