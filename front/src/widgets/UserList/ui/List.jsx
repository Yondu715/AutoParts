import { useModel } from "../model";
import { UserCard } from "entities/user";
import { DeleteUser } from "features/user/DeleteUser";
import styles from "./List.module.css";

export function List() {
    const {
        users, selectedUsers, usersHandler
    } = useModel();

    return (
        <div className={[styles.wrapUsers, "fade"].join(" ")}>
            <div className={styles.users}>
                {users.map((user) =>
                    <UserCard
                        key={user.id}
                        user={user}
                        onClick={() => usersHandler(user.id)}
                        className={selectedUsers.includes(user.id) ? styles.active : styles.notActive}
                    />
                )}
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <DeleteUser />
                </div>
            </div>
        </div>
    );
}