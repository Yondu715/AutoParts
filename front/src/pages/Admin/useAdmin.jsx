import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserLogin, useValidate } from "../../hook/useUserStore";
import { Applications } from "./components/Applicatons/Applicatons";
import { Users } from "./components/Users/Users";
import {
    ANY_ROUTE, APPLICATIONS_ROUTE, DEFAULT_PAGE_ROUTE,
    NOT_FOUND_ROUTE, USERS_ROUTE
} from "../../utils/consts";


export function useAdmin() {
    const [logoutAnimation, setAnimation] = useState(false);
    const { signOut } = useValidate();
    const userLogin = useUserLogin();

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
        }, 800);
    }

    return {
        logoutAnimation, logout,
        menuItems, routes, userLogin
    }
}