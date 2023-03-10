import styles from "./Header.module.css";

export function Header({name, username, onClick}) {
    return (
        <div className={styles.header}>
            <div className={styles.start}>
                <span>{name}</span>
            </div>
            <div className={styles.end}>
                <span>{username}</span>
                <button onClick={onClick} />
            </div>
        </div>
    );
}
