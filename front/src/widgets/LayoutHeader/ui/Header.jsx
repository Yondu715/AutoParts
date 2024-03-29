import { useModel } from "../model";
import styles from "./Header.module.css";

export function Header() {

    const {
        logoutAnimation, userLogin, logout
    } = useModel();

    return (
        <>
            <span className={[styles.overPage, logoutAnimation ? "cover" : ""].join(" ")} />
            <div className={styles.header}>
                <div className={styles.start}>
                    <span>Autoparts</span>
                </div>
                <div className={styles.end}>
                    <span>{userLogin}</span>
                    <button onClick={logout} />
                </div>
            </div>
        </>
    );
}