import { useUsers } from "./useUsers";
import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import styles from "./Users.module.css";

export function Users() {
    const {
        users, selectedUsers,
        _asyncSendDeleteInfo, _selectUser
    } = useUsers();

    return (
        <div className={[styles.wrapUsers, "fade"].join(" ")}>
            <div className={styles.users}>
                <table>
                    <tbody>
                        {users.map(({ user: { id, login, password, role } }) =>
                            <tr key={id} onClick={() => _selectUser(id)} className={selectedUsers.includes(id) ? styles.active : styles.notActive}>
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
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <SubmitButton type="delete" onClick={_asyncSendDeleteInfo}>Удалить</SubmitButton>
                </div>
            </div>
        </div>
    );
}