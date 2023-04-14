import { WrapHeader } from "../../widgets/WrapHeader";
import { WrapUserContent } from "../../widgets/WrapUserContent";
import styles from "./MainPage.module.css";

export function MainPage() {

    return (
        <div className={styles.mainPage}>
            <WrapHeader/>
            <WrapUserContent/>
        </div>
    );
}