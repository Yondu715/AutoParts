import { Routes, Route, Navigate } from "react-router-dom";
import { viewerModel } from "entities/viewer";
import { authRoutes, publicRoutes } from "./routes";
import { AUTH_ROUTE } from "shared/config";

export function Routing() {
    const viewer = viewerModel.useUserInfo();
    const redirect = <Navigate to={AUTH_ROUTE} replace />
    return (
        <Routes>
            {authRoutes.map(({ path, element, role }) =>
                <Route key={path} path={path} element={viewer.isAuth && (viewer.role === role) ? element : redirect} exact />
            )}

            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} exact />
            )}
        </Routes>
    );
}
