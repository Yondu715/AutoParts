import { Route, Routes } from "react-router-dom";
import { useAdmin } from "../model";
import { Header } from "widgets/LayoutHeader";
import { NavBar } from "widgets/LayoutNavBar";
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