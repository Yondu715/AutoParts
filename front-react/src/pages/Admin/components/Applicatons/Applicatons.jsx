import { SelectBox } from "../../../../components/SelectBox/SelectBox";
import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import { useMountEffect } from "../../../../hook/useMountEffect";
import styles from "./applications.module.css";
import { useApplications } from "./useApplications";

export function Applications() {

    const roles = ["client", "admin"];
    const {
        applications, selectedApp, _asyncGetAllApplications,
        _selectApplication, _selectHandler, _asyncAcceptApplications,
        _asyncDeleteApplications
    } = useApplications();


    useMountEffect(_asyncGetAllApplications);

    return (
        <div className={styles.wrapContent}>
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
                        <SubmitButton content="Принять" onClick={_asyncAcceptApplications} />
                    </div>
                    <div className={styles.btnContainer}>
                        <SubmitButton type="delete" content="Удалить" onClick={_asyncDeleteApplications} />
                    </div>
                </div>
            </div>

        </div>
    );
}