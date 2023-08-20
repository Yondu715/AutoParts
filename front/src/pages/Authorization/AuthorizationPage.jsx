import { AuthorizationForm } from "features/viever/AuthorizationForm";
import styles from "./AuthRegPage.module.css"

export function AuthorizationPage() {
    return (
        <div className={styles.authRegPage}>
            <AuthorizationForm />
        </div>
    );
}