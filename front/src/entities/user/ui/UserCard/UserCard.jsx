import styles from "./UserCard.module.css";

export function UserCard({ user, ...props }) {
    const { id, login, password, role } = user;
    return (
        <tr {...props} >
            <td>
                <div className={styles.user}>
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
            </td>
        </tr>
    );
}