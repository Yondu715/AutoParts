import styles from "./StatusError.module.css";


export function StatusError({message, ...props}) {
    return (
        <span className={styles.status} {...props}>{message}</span>
    );
}