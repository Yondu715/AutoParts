import { WrapHeader } from "./components/WrapHeader/WrapHeader";
import { WrapContent } from "./components/WrapContent/WrapContent";
import styles from "./MainPage.module.css";

export function MainPage() {

    return (
        <div className={styles.mainPage}>
            <WrapHeader/>
            <WrapContent/>
        </div>
    );
}