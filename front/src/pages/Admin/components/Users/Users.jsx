import { useUsers } from "./useUsers";
import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import styles from "./Users.module.css";

export function Users() {
    const {
        users, selectedUsers,
        asyncSendDeleteInfo, usersHandler
    } = useUsers();

    return (
        <div className={[styles.wrapUsers, "fade"].join(" ")}>
            <div className={styles.users}>
                <table>
                    <tbody>
                        {users.map(({ user }) =>
                            <RowElement
                                key={user.id}
                                user={user}
                                onClick={() => usersHandler(user.id)}
                                className={selectedUsers.includes(user.id) ? styles.active : styles.notActive}
                            />
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <SubmitButton type="delete" onClick={asyncSendDeleteInfo}>Удалить</SubmitButton>
                </div>
            </div>
        </div>
    );
}


function RowElement({ user, ...props }) {
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