import { Routes, Route, Navigate } from "react-router-dom";
import { useValidate } from "../../hook/useValidate";
import { authRoutes, publicRoutes } from "../routes";

function AppRouter() {
    const {user} = useValidate();
    const redirect = <Navigate to="/auth" replace/>
    return (
        <Routes>
            {authRoutes.map(({ path, element, role }) =>
                <Route key={path} path={path} element={user.isAuth && (user.role === role) ? element: redirect} exact/>
            )}

            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} exact/>
            )}
        </Routes>
    );
}

export default AppRouter;