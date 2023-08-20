import { Navigate, useRoutes } from "react-router-dom";
import { PATH, ROLE } from "shared/config";
import { viewerModel } from "entities/viewer";
import { MainLayout, MAIN_PATH } from "pages/MainLayout";
import { AuthorizationPage } from "pages/Authorization";
import { NotFoundPage } from "pages/NotFound";
import { RegistrationPage } from "pages/Registration";

export function Router() {
    const viewer = viewerModel.useUserInfo();
    const redirect = <Navigate to={PATH.auth} replace />;
    let rootRedirect = redirect;
    if (viewer.isAuth) {
        switch (viewer.role) {
            case ROLE.client:
                rootRedirect = <Navigate to={PATH.main.root} replace />;
                break;
            case ROLE.admin:
                rootRedirect = <Navigate to={PATH.admin.root} replace />;
                break;
            default:
                break;
        }
    }

    return useRoutes([
        {
            element: <AuthorizationPage />,
            path: PATH.auth
        },
        {
            element: <RegistrationPage />,
            path: PATH.reg
        },
        {
            element: viewer.isAuth && viewer.role === ROLE.client ? <MainLayout role={viewer.role} /> : redirect,
            path: PATH.main.root,
            children: MAIN_PATH[viewer.role]
        },
        {
            element: viewer.isAuth && viewer.role === ROLE.admin ? <MainLayout role={viewer.role} /> : redirect,
            path: PATH.admin.root,
            children: MAIN_PATH[viewer.role]
        },
        {
            path: PATH.root,
            element: rootRedirect
        },
        {
            path: PATH.notFound,
            element: <NotFoundPage/>
        },
        {
            path: PATH.any,
            element: <Navigate to={PATH.notFound} replace />
        },
    ])
}
