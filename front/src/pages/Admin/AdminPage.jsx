import { useAdmin } from "./useAdmin";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./AdminPage.module.css";

export function AdminPage() {
    const {
        logoutAnimation, logout, items, 
        setCurrComp, initialItem, currComp
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
                    items={items}
                    changeItem={setCurrComp}
                    initialItem={initialItem}
                />
                <div className={styles.content}>
                    {currComp}
                </div>
            </div>
        </div>
    );
}