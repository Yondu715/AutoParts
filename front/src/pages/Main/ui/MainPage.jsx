import { Outlet } from "react-router-dom";
import { Header } from "widgets/LayoutHeader";
import { NavBar } from "widgets/LayoutNavBar";
import { PATH } from "shared/config";
import styles from "./MainPage.module.css";

export function MainPage() {

    const menuItems = {
        "Купить": PATH.products,
        "Продать": PATH.sale,
        "Мои товары": PATH.userProducts,
        "Корзина": PATH.cart
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