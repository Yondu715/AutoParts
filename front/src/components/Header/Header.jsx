import styles from "./Header.module.css";

export function Header({ name, username, onClick, ...props }) {
    return (
        <div className={styles.header} {...props}>
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
