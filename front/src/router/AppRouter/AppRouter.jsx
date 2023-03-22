import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { AUTH_ROUTE } from "../../utils/consts";
import { useUserInfo } from "../../hook/useUserInfo";

export function AppRouter() {
    const user = useUserInfo();
    const redirect = <Navigate to={AUTH_ROUTE} replace />
    return (
        <Routes>
            {authRoutes.map(({ path, element, role }) =>
                <Route key={path} path={path} element={user.isAuth && (user.role === role) ? element : redirect} exact />
            )}

            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} exact />
            )}
        </Routes>
    );
}
