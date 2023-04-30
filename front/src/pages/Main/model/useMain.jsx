import { Navigate } from "react-router-dom";
import { Cart } from "features/Cart";
import { ProductInfo } from "features/ProductInfo";
import { Products } from "features/Products";
import { Sale } from "features/Sale";
import { UserProducts } from "features/UserProducts";
import {
    ANY_ROUTE, CART_ROUTE, DEFAULT_PAGE_ROUTE,
    NOT_FOUND_ROUTE, PRODUCTS_ROUTE, PRODUCT_INFO_ROUTE,
    SALE_ROUTE, USER_PRODUCTS_ROUTE
} from "shared/config";

export function useMain() {
    const menuItems = {
        "Купить": PRODUCTS_ROUTE,
        "Продать": SALE_ROUTE,
        "Мои товары": USER_PRODUCTS_ROUTE,
        "Корзина": CART_ROUTE
    }

    const routes = [
        {
            path: PRODUCTS_ROUTE,
            element: <Products />
        },
        {
            path: PRODUCT_INFO_ROUTE,
            element: <ProductInfo />
        },
        {
            path: SALE_ROUTE,
            element: <Sale />
        },
        {
            path: USER_PRODUCTS_ROUTE,
            element: <UserProducts />
        },
        {
            path: CART_ROUTE,
            element: <Cart />
        },
        {
            path: DEFAULT_PAGE_ROUTE,
            element: <Navigate to={PRODUCTS_ROUTE} replace />
        },
        {
            path: ANY_ROUTE,
            element: <Navigate to={NOT_FOUND_ROUTE} replace />
        }
    ];

    return {
        menuItems, routes
    }
}