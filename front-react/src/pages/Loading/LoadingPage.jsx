import styles from "./loadingPage.module.css";

export function LoadingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
        </div>
    );
}