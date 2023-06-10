import { Navigate } from "react-router-dom";
import { AuthPage } from "pages/Authorization";
import { NotFoundPage } from "pages/NotFound";
import { RegPage } from "pages/Registration";
import { MainPage } from "pages/Main";
import { AdminPage } from "pages/Admin";
import {
    ADMIN_ROLE, ADMIN_ROUTE, AUTH_ROUTE, CLIENT_ROLE,
    MAIN_ROUTE, ANY_ROUTE, REG_ROUTE, NOT_FOUND_ROUTE, ROOT_ROUTE,
} from "shared/config";

export const authRoutes = [
    {
        path: MAIN_ROUTE + "/*",
        element: <MainPage />,
        role: CLIENT_ROLE
    },
    {
        path: ADMIN_ROUTE + "/*",
        element: <AdminPage />,
        role: ADMIN_ROLE

    },
    {
        path: ROOT_ROUTE,
        element: <Navigate to={MAIN_ROUTE}/>,
        role: CLIENT_ROLE
    }
];

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        element: <AuthPage />,
    },
    {
        path: REG_ROUTE,
        element: <RegPage />,
    },
    {
        path: NOT_FOUND_ROUTE,
        element: <NotFoundPage />
    },
    {
        path: ANY_ROUTE,
        element: <Navigate to={NOT_FOUND_ROUTE} />
    },
];