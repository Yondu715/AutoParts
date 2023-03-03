import styles from "./StatusError.module.css";


export function StatusError({message}) {
    return (
        <span className={styles.status}>{message}</span>
    );
}