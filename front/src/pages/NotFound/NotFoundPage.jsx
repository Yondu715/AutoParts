import { Link } from "react-router-dom";
import { PATH } from "shared/config";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
    return (
        <div className={styles.errorPage}>
            <div className={styles.container}>
                <h1 className={styles.error}>404</h1>
                <span>Упс!!! (」°ロ°)」</span>
                <Link to={PATH.auth}>Вернуться</Link>
            </div>
        </div>
    );
}