import { SelectBox } from "../../../shared/ui/SelectBox";
import styles from "./ApplicationCard.module.css";

export function ApplicationCard({ user, roles, onChange, ...props }) {
    const { id, login, password } = user;
    return (
        <tr {...props}>
            <td>
                <div className={styles.application}>
                    <div className={styles.id}>
                        <span>{id}</span>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.login}>{login}</span>
                        <span className={styles.password}>{password}</span>
                    </div>
                    <div className={styles.role}>
                        <SelectBox items={roles} onChange={onChange} />
                    </div>
                </div>
            </td>
        </tr>
    );
}