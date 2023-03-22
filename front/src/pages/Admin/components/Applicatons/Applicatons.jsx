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
                        {applications.map(({ user: { id, login, password } }) =>
                            <tr key={id} onClick={() => _selectApplication(id)} className={selectedApp.includes(id) ? styles.active : styles.notActive} >
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
                                            <SelectBox items={roles} onChange={(e) => _selectHandler(e, id)} />
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