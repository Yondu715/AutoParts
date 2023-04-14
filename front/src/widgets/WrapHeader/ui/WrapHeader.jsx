import { Header } from "../../../shared/ui";
import { useWrapHeader } from "../model";
import styles from "./WrapHeader.module.css";

export function WrapHeader() {

    const {
        logoutAnimation, userLogin, logout
    } = useWrapHeader();

    return (
        <>
            <span className={[styles.overPage, logoutAnimation ? "cover" : ""].join(" ")} />
            <Header
                name="Autoparts"
                username={userLogin}
                onClick={logout}
            />
        </>
    );
}