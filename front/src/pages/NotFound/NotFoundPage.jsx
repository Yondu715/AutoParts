import { Link } from "react-router-dom";
import { AUTH_ROUTE } from "../../utils/consts";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
    return (
        <div className={styles.errorPage}>
            <div className={styles.container}>
                <h1 className={styles.error}>404</h1>
                <span>Упс!!! (」°ロ°)」</span>
                <Link to={AUTH_ROUTE}>Вернуться</Link>
            </div>
        </div>
    );
}