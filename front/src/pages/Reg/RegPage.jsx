import { RegistrationForm } from "./components/RegistrationForm/RegistrationForm";
import styles from "./AuthRegPage.module.css";

export function RegPage() {
    
    return (
        <div className={styles.authRegPage}>
            <RegistrationForm/>
        </div>
    );
}