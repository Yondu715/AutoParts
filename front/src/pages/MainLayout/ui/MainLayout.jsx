import { Outlet } from "react-router-dom";
import { Header } from "widgets/LayoutHeader";
import { NavBar } from "widgets/LayoutNavBar";
import { PATH, ROLE } from "shared/config";
import styles from "./MainLayout.module.css";

export function MainLayout({role}) {

    let menuItems;
    switch (role) {
        case ROLE.client:
            menuItems = {
                "Купить": PATH.products,
                "Продать": PATH.sale,
                "Мои товары": PATH.userProducts,
                "Корзина": PATH.cart
            }
            break;
        case ROLE.admin:
            menuItems = {
                "Заявки": PATH.applications,
                "Пользователи": PATH.users,
            }
        break;
        default:
            break;
    }

    return (
        <div className={styles.mainPage}>
            <Header/>
            <div className={styles.wrapContent}>
                <NavBar items={menuItems} />
                <div className={styles.content}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}