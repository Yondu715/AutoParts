import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserLogin, useValidate } from "../../hook/useStore";
import { Cart } from "./components/Cart/Cart";
import { ProductInfo } from "./components/ProductInfo/ProductInfo";
import { Products } from "./components/Products/Products";
import { Sale } from "./components/Sale/Sale";
import { UserProducts } from "./components/UserProducts/UserProducts";
import { 
    ANY_ROUTE, CART_ROUTE, DEFAULT_PAGE_ROUTE, NOT_FOUND_ROUTE, 
    PRODUCTS_ROUTE, PRODUCT_INFO_ROUTE, SALE_ROUTE, USER_PRODUCTS_ROUTE 
} from "../../utils/consts";

export function useMain() {
    const [logoutAnimation, setAnimation] = useState(false);
    const { signOut } = useValidate();
    const userLogin = useUserLogin();

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


    const logout = () => {
        setAnimation(true);
        setTimeout(() => {
            localStorage.clear();
            signOut();
        }, 800);
    }

    return {
        logoutAnimation, menuItems,
        logout, routes, userLogin
    }
}