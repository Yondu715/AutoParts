import { SubmitButton } from "../../../shared/ui/SubmitButton";
import { ApplicationCard } from "../../../entities/application";
import { useList } from "../model";
import styles from "./List.module.css";

export function List() {

    const {
        applications, selectedApp, selectApplication,
        selectHandler, asyncAcceptApp,
        asyncDeleteApp, roles
    } = useList();

    return (
        <div className={[styles.wrapContent, "fade"].join(" ")}>
            <div className={styles.applications}>
                <table>
                    <tbody>
                        {applications.map(({ user }) =>
                            <ApplicationCard
                                key={user.id}
                                user={user}
                                roles={roles}
                                onChange={(e) => selectHandler(e, user.id)}
                                onClick={() => selectApplication(user.id)}
                                className={selectedApp.includes(user.id) ? styles.active : styles.notActive}
                            />
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <div className={styles.btnContainer}>
                        <SubmitButton onClick={asyncAcceptApp}>Принять</SubmitButton>
                    </div>
                    <div className={styles.btnContainer}>
                        <SubmitButton type="delete" onClick={asyncDeleteApp}>Удалить</SubmitButton>
                    </div>
                </div>
            </div>
        </div>
    );
}


