import { Navigate } from "react-router-dom";
import { ApplicationList } from "widgets/ApplicationList";
import { UserList } from "widgets/UserList";
import {
    ANY_ROUTE, APPLICATIONS_ROUTE, DEFAULT_PAGE_ROUTE,
    NOT_FOUND_ROUTE, USERS_ROUTE
} from "shared/config";

export function useModel() {
    const menuItems = {
        "Заявки": APPLICATIONS_ROUTE,
        "Пользователи": USERS_ROUTE,
    }

    const routes = [
        {
            path: APPLICATIONS_ROUTE,
            element: <ApplicationList />
        },
        {
            path: USERS_ROUTE,
            element: <UserList />
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