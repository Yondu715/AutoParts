import { Route, Routes } from "react-router-dom";
import { useMain } from "./useMain";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./MainPage.module.css";


export function MainPage() {

    const {
        menuItems, logout, 
        logoutAnimation, routes
    } = useMain();

    return (
        <div className={styles.mainPage}>
            <span className={[styles.overPage, logoutAnimation ? "cover" : ""].join(" ")} />
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