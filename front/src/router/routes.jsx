import { Navigate } from "react-router-dom";
import { AuthPage } from "../pages/Auth/AuthPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { RegPage } from "../pages/Reg/RegPage";
import { MainPage } from "../pages/Main/MainPage";
import { AdminPage } from "../pages/Admin/AdminPage";
import {
    ADMIN_ROLE, ADMIN_ROUTE, AUTH_ROUTE, CLIENT_ROLE,
    MAIN_ROUTE, ANY_ROUTE, REG_ROUTE, NOT_FOUND_ROUTE, ROOT_ROUTE,
} from "../utils/consts";

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
]