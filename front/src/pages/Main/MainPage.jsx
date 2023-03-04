import { useMain } from "./useMain";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./MainPage.module.css";
import { Outlet } from "react-router-dom";


export function MainPage() {

    const {
        menuItems, logout, logoutAnimation
    } = useMain();

    return (
        <div className={styles.mainPage}>
            <span className={`${styles.overPage} ${logoutAnimation ? "cover" : ""}`}></span>
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