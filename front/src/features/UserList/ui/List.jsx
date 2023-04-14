import { SubmitButton } from "../../../shared/ui";
import { UserCard } from "../../../entities/user";
import { useList } from "../model";
import styles from "./List.module.css";

export function List() {
    const {
        users, selectedUsers,
        asyncSendDeleteInfo, usersHandler
    } = useList();

    return (
        <div className={[styles.wrapUsers, "fade"].join(" ")}>
            <div className={styles.users}>
                <table>
                    <tbody>
                        {users.map(({ user }) =>
                            <UserCard
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