import { Navigate } from "react-router-dom";
import { Applications } from "../Applicatons/Applicatons";
import { Users } from "../Users/Users";
import {
    ANY_ROUTE, APPLICATIONS_ROUTE, DEFAULT_PAGE_ROUTE,
    NOT_FOUND_ROUTE, USERS_ROUTE
} from "../../../../utils/consts";

export function useWrapContent() {
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

    return {
        menuItems, routes
    }
}