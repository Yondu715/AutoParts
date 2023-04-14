import { Route, Routes } from "react-router-dom";
import { NavBar } from "../../../shared/ui";
import { useWrapContent } from "../model";
import styles from "./WrapContent.module.css";

export function WrapContent() {

    const {
        menuItems, routes
    } = useWrapContent();

    return (
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
    );
}