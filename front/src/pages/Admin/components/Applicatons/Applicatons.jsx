import { useApplications } from "./useApplications";
import { SelectBox } from "../../../../components/SelectBox/SelectBox";
import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import styles from "./Applications.module.css";

export function Applications() {

    const {
        applications, selectedApp, _selectApplication,
        _selectHandler, _asyncAcceptApplications,
        _asyncDeleteApplications, roles
    } = useApplications();

    return (
        <div className={[styles.wrapContent, "fade"].join(" ")}>
            <div className={styles.applications}>
                <table>
                    <tbody>
                        {applications.map(({ user }) =>
                            <RowElement
                                key={user.id}
                                user={user}
                                roles={roles}
                                onChange={(e) => _selectHandler(e, user.id)}
                                onClick={() => _selectApplication(user.id)}
                                className={selectedApp.includes(user.id) ? styles.active : styles.notActive}
                            />
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <div className={styles.btnContainer}>
                        <SubmitButton onClick={_asyncAcceptApplications}>Принять</SubmitButton>
                    </div>
                    <div className={styles.btnContainer}>
                        <SubmitButton type="delete" onClick={_asyncDeleteApplications}>Удалить</SubmitButton>
                    </div>
                </div>
            </div>
        </div>
    );
}


function RowElement({ user, roles, onChange, ...props }) {
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