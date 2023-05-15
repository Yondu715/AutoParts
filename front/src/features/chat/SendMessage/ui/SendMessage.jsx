import { useModel } from "../model";
import { SubmitButton } from "shared/ui/SubmitButton";
import styles from "./SendMessage.module.css";

export function SendMessage() {
    const {
        message, handlerMessage,
        onEnter, sendMessage
    } = useModel();

    return (
        <div className={styles.form}>
            <input value={message} className={styles.inputMessage} onChange={handlerMessage} onKeyDown={onEnter} />
            <div className={styles.btnPlace}>
                <SubmitButton type="info" onClick={sendMessage}>Отправить</SubmitButton>
            </div>
        </div>
    );
}