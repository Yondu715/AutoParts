import { ApplicationCard } from "entities/user";
import { useList } from "../model";
import { UserAcceptApplications } from "features/UserAcceptApplication";
import { UserDeleteApplications } from "features/UserDeleteApplications";
import styles from "./List.module.css";

export function List() {

    const {
        applications, selectedApplications, selectApplication,
        changeRoleHandler, roles
    } = useList();

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
                        <UserAcceptApplications/>
                    </div>
                    <div className={styles.btnContainer}>
                        <UserDeleteApplications/>
                    </div>
                </div>
            </div>
        </div>
    );
}

