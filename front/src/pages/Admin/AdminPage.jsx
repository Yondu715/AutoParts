import { useAdmin } from "./useAdmin";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import styles from "./AdminPage.module.css";

export function AdminPage() {
    const {
        logoutAnimation, logout, menuItems,
    } = useAdmin();
    return (
        <div className={styles.adminPage}>
            <span className={[styles.overPage, logoutAnimation ? "cover" : ""].join(" ")}></span>
            <Header
                name="Autoparts"
                username={localStorage.getItem("login")}
                onClick={logout}
            />
            <div className={styles.wrapContent}>
                <NavBar
                    items={menuItems}
                />
                <div className={styles.content}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}