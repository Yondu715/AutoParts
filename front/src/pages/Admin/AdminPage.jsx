import { WrapAdminContent } from "../../widgets/WrapAdminContent";
import { WrapHeader } from "../../widgets/WrapHeader";
import styles from "./AdminPage.module.css";

export function AdminPage() {
    return (
        <div className={styles.adminPage}>
            <WrapHeader/>
            <WrapAdminContent/>
        </div>
    );
}