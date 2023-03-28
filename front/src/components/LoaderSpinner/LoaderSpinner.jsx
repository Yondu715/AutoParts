import styles from "./LoaderSpinner.module.css";

export function LoaderSpinner() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}/>
        </div>
    );
}