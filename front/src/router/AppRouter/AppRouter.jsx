import { useValidate } from "../../hook/useValidate";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";

export function AppRouter() {
    const { user } = useValidate();
    const redirect = <Navigate to="/auth" replace />
    return (
        <Routes>
            {authRoutes.map(({ path, element, role, sub }) =>
                <Route key={path} path={path} element={user.isAuth && (user.role === role) ? element : redirect} exact>
                    {sub && sub.map(({ path, element }) =>
                        <Route key={path} path={path} element={element} />
                    )}
                </Route>
            )}

            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} exact />
            )}
        </Routes>
    );
}
