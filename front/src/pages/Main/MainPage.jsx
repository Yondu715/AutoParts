import { useMain } from "./useMain";
import { WithParentFunc } from "../../hoc/WithParentFunc";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import styles from "./MainPage.module.css";

export function MainPage() {
    
    const {
        items, logout, logoutAnimation,
        setCurrComp, initialItem, currComp
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
                    items={items}
                    changeItem={setCurrComp}
                    initialItem={initialItem}
                />
                <div className={styles.content}>
                    <WithParentFunc func={setCurrComp}>
                        {currComp}
                    </WithParentFunc>
                </div>
            </div>
        </div>
    );
}