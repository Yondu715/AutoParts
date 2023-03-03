import { Navigate } from "react-router-dom";
import { AdminPage } from "../pages/Admin/AdminPage";
import { AuthPage } from "../pages/Auth/AuthPage";
import { MainPage } from "../pages/Main/MainPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { RegPage } from "../pages/Reg/RegPage";
import { ADMIN_ROLE, ADMIN_ROUTE, AUTH_ROUTE, CLIENT_ROLE, DEFAULT_ROUTE, MAIN_ROUTE, NOTFOUND_ROUTE, REG_ROUTE } from "./consts";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        element: <MainPage />,
        role: CLIENT_ROLE,
    },
    {
        path: ADMIN_ROUTE,
        element: <AdminPage/>,
        role: ADMIN_ROLE,
    },
    {
        path: DEFAULT_ROUTE,
        element: <Navigate to="/main" replace />,
        role: CLIENT_ROLE,
    },
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
        path: NOTFOUND_ROUTE,
        element: <NotFoundPage />
    },
]