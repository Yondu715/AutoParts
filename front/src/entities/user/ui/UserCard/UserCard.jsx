import styles from "./UserCard.module.css";

export function UserCard({ user, className, ...props }) {
    const { id, login, password, role } = user;
    return (
        <div className={[className, styles.user].join(' ')} {...props}>
            <div className={styles.id}>
                <span>{id}</span>
            </div>
            <div className={styles.info}>
                <span>{login}</span>
                <span>{password}</span>
            </div>
            <div className={styles.role}>
                <span>{role}</span>
            </div>
        </div>
    );
}