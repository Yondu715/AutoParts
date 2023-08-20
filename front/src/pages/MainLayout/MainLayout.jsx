import { Navigate, Outlet } from "react-router-dom";
import { Header } from "widgets/LayoutHeader";
import { NavBar } from "widgets/LayoutNavBar";
import { Products } from "widgets/Products";
import { ProductInfo } from "widgets/ProductInfo";
import { Sale } from "widgets/Sale";
import { UserProducts } from "widgets/UserProducts";
import { Cart } from "widgets/Cart";
import { ApplicationList } from "widgets/ApplicationList";
import { UserList } from "widgets/UserList";
import { PATH, ROLE } from "shared/config";
import styles from "./MainLayout.module.css";


const menuItems = {
    [ROLE.client]: {
        "Купить": PATH.main.products,
        "Продать": PATH.main.sale,
        "Мои товары": PATH.main.userProducts,
        "Корзина": PATH.main.cart
    },
    [ROLE.admin]: {
        "Заявки": PATH.admin.applications,
        "Пользователи": PATH.admin.users,
    }
}


export function MainLayout({role}) {
    return (
        <div className={styles.mainPage}>
            <Header/>
            <div className={styles.wrapContent}>
                <NavBar items={menuItems[role]} />
                <div className={styles.content}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export const MAIN_PATH = {
    [ROLE.client]: [
        {
            element: <Navigate to={PATH.main.products} replace />,
            index: true
        },
        {
            path: PATH.main.products,
            element: <Products />
        },
        {
            path: PATH.main.productInfo,
            element: <ProductInfo />
        },
        {
            path: PATH.main.sale,
            element: <Sale />
        },
        {
            path: PATH.main.userProducts,
            element: <UserProducts />
        },
        {
            path: PATH.main.cart,
            element: <Cart />
        },
    ],
    [ROLE.admin]: [
        {
            element: <Navigate to={PATH.admin.applications} replace />,
            index: true,
        },
        {
            path: PATH.admin.applications,
            element: <ApplicationList />
        },
        {
            path: PATH.admin.users,
            element: <UserList />
        },
    ]
}