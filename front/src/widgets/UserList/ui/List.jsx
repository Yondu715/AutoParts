import { useList } from "../model";
import { UserCard } from "entities/user";
import { UserDelete } from "features/UserDelete";
import styles from "./List.module.css";

export function List() {
    const {
        users, selectedUsers, usersHandler
    } = useList();

    return (
        <div className={[styles.wrapUsers, "fade"].join(" ")}>
            <div className={styles.users}>
                <table>
                    <tbody>
                        {users.map((user) =>
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
                    <UserDelete/>
                </div>
            </div>
        </div>
    );
}