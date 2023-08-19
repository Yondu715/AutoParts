import { Navigate, useRoutes } from "react-router-dom";
import { PATH, ROLE } from "shared/config";
import { viewerModel } from "entities/viewer";
import { NotFoundPage } from "pages/NotFound";
import { Products } from "widgets/Products";
import { ProductInfo } from "widgets/ProductInfo";
import { Sale } from "widgets/Sale";
import { UserProducts } from "widgets/UserProducts";
import { Cart } from "widgets/Cart";
import { ApplicationList } from "widgets/ApplicationList";
import { UserList } from "widgets/UserList";
import { AuthPage } from "pages/Authorization";
import { RegPage } from "pages/Registration";
import { MainLayout } from "pages/MainLayout";

export function Router() {
    const viewer = viewerModel.useUserInfo();
    const redirect = <Navigate to={PATH.auth} replace />;
    let rootRedirect = redirect;
    if (viewer.isAuth) {
        switch (viewer.role) {
            case ROLE.client:
                rootRedirect = <Navigate to={PATH.main} replace />;
                break;
            case ROLE.admin:
                rootRedirect = <Navigate to={PATH.admin} replace />;
                break;
            default:
                break;
        }
    }

    return useRoutes([
        {
            element: <AuthPage />,
            path: PATH.auth
        },
        {
            element: <RegPage />,
            path: PATH.reg
        },
        {
            element: viewer.isAuth && viewer.role === ROLE.client ? <MainLayout role={viewer.role} /> : redirect,
            path: PATH.main,
            children: [
                {
                    path: PATH.default,
                    element: <Navigate to={PATH.products} replace />
                },
                {
                    path: PATH.products,
                    element: <Products />
                },
                {
                    path: PATH.productInfo,
                    element: <ProductInfo />
                },
                {
                    path: PATH.sale,
                    element: <Sale />
                },
                {
                    path: PATH.userProducts,
                    element: <UserProducts />
                },
                {
                    path: PATH.cart,
                    element: <Cart />
                },
            ]
        },
        {
            element: viewer.isAuth && viewer.role === ROLE.admin ? <MainLayout role={viewer.role} /> : redirect,
            path: PATH.admin,
            children: [
                {
                    path: PATH.default,
                    element: <Navigate to={PATH.applications} replace />
                },
                {
                    path: PATH.applications,
                    element: <ApplicationList />
                },
                {
                    path: PATH.users,
                    element: <UserList />
                },
            ]
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
