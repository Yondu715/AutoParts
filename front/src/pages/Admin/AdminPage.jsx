import { WrapHeader } from "./components/WrapHeader/WrapHeader";
import { WrapContent } from "./components/WrapContent/WrapContent";
import styles from "./AdminPage.module.css";

export function AdminPage() {
    
    return (
        <div className={styles.adminPage}>
            <WrapHeader/>
            <WrapContent/>
        </div>
    );
}