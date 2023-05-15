import { AuthorizationForm } from "features/viever/AuthorizationForm";
import styles from "./AuthRegPage.module.css"

export function AuthPage() {
    return (
        <div className={styles.authRegPage}>
            <AuthorizationForm />
        </div>
    );
}