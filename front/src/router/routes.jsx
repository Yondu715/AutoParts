import { Navigate } from "react-router-dom";
import { AuthPage } from "../pages/Auth/AuthPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { RegPage } from "../pages/Reg/RegPage";

import { MainPage } from "../pages/Main/MainPage";
import { Cart } from "../pages/Main/components/Cart/Cart";
import { ProductInfo } from "../pages/Main/components/ProductInfo/ProductInfo";
import { Products } from "../pages/Main/components/Products/Products";
import { Sale } from "../pages/Main/components/Sale/Sale";
import { UserProducts } from "../pages/Main/components/UserProducts/UserProducts";

import { AdminPage } from "../pages/Admin/AdminPage";
import {Applications } from "../pages/Admin/components/Applicatons/Applicatons";
import { Users } from "../pages/Admin/components/Users/Users";

import { ADMIN_ROLE, ADMIN_ROUTE, APPLICATIONS_ROUTE, AUTH_ROUTE, CART_ROUTE, CLIENT_ROLE, DEFAULT_ROUTE, MAIN_ROUTE, NOTFOUND_ROUTE, PRODUCTINFO_ROUTE, PRODUCTS_ROUTE, REG_ROUTE, SALE_ROUTE, USERPRODUCTS_ROUTE, USERS_ROUTE } from "./consts";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        element: <MainPage />,
        role: CLIENT_ROLE,
        sub: [
            {
                path: MAIN_ROUTE + PRODUCTS_ROUTE,
                element: <Products />
            },
            {
                path: MAIN_ROUTE + PRODUCTINFO_ROUTE,
                element: <ProductInfo />
            },
            {
                path: MAIN_ROUTE + SALE_ROUTE,
                element: <Sale />
            },
            {
                path: MAIN_ROUTE + USERPRODUCTS_ROUTE,
                element: <UserProducts />
            },
            {
                path: MAIN_ROUTE + CART_ROUTE,
                element: <Cart />
            }
        ]
    },
    {
        path: ADMIN_ROUTE,
        element: <AdminPage/>,
        role: ADMIN_ROLE,
        sub: [
            {
                path: ADMIN_ROUTE + APPLICATIONS_ROUTE,
                element: <Applications />
            },
            {
                path: ADMIN_ROUTE + USERS_ROUTE,
                element: <Users />
            }
        ]
        
    },
    {
        path: DEFAULT_ROUTE,
        element: <Navigate to={MAIN_ROUTE + PRODUCTS_ROUTE} replace />,
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