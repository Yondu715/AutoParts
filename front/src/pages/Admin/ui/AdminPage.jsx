import { Outlet } from "react-router-dom";
import { Header } from "widgets/LayoutHeader";
import { NavBar } from "widgets/LayoutNavBar";
import { PATH } from "shared/config";
import styles from "./AdminPage.module.css";

export function AdminPage() {

    const menuItems = {
        "Заявки": PATH.applications,
        "Пользователи": PATH.users,
    }

    return (
        <div className={styles.adminPage}>
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