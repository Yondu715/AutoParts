import { useAdmin } from "./useAdmin";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./AdminPage.module.css";
import { Route, Routes } from "react-router-dom";

export function AdminPage() {
    const {
        logoutAnimation, logout, 
        menuItems, routes
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
                <NavBar items={menuItems} />
                <div className={styles.content}>
                    <Routes>
                        {
                            routes.map(({ path, element }) => <Route key={path} path={path} element={element} />)
                        }
                    </Routes>
                </div>
            </div>
        </div>
    );
}