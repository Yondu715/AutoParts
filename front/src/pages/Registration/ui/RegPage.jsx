import { RegistrationForm } from "features/RegistrationForm";
import styles from "./AuthRegPage.module.css";

export function RegPage() {
    return (
        <div className={styles.authRegPage}>
            <RegistrationForm/>
        </div>
    );
}