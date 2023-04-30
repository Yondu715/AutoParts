import { Route, Routes } from "react-router-dom";
import { Header } from "widgets/Header";
import { NavBar } from "widgets/NavBar";
import { useAdmin } from "../model/useAdmin";
import styles from "./AdminPage.module.css";

export function AdminPage() {

    const {
        menuItems, routes
    } = useAdmin();

    return (
        <div className={styles.adminPage}>
            <Header/>
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