import { useModel } from "../model";
import { ApplicationCard } from "entities/user";
import { AcceptApplications } from "features/user/AcceptApplication";
import { DeleteApplications } from "features/user/DeleteApplications";
import styles from "./List.module.css";

export function List() {

    const {
        applications, selectedApplications, selectApplication,
        changeRoleHandler, roles
    } = useModel();

    return (
        <div className={[styles.wrapContent, "fade"].join(" ")}>
            <div className={styles.applications}>
                <table>
                    <tbody>
                        {applications.map((user) =>
                            <ApplicationCard
                                key={user.id}
                                user={user}
                                roles={roles}
                                onChange={(e) => changeRoleHandler(e, user.id)}
                                onClick={() => selectApplication(user.id)}
                                className={selectedApplications.includes(user.id) ? styles.active : styles.notActive}
                            />
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <div className={styles.btnContainer}>
                        <AcceptApplications/>
                    </div>
                    <div className={styles.btnContainer}>
                        <DeleteApplications/>
                    </div>
                </div>
            </div>
        </div>
    );
}


