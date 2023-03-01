import styles from "./header.module.css";

export function Header({name, username, onClick}) {
    return (
        <div className={styles.header}>
            <div className={styles.start}>
                <span>{name}</span>
            </div>
            <div className={styles.end}>
                <span>{username}</span>
                <button onClick={onClick}></button>
            </div>
        </div>
    );
}
