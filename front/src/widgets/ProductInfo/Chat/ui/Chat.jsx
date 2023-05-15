import { useModel } from "../model";
import { SendMessage } from "features/chat/SendMessage";
import { MessagesList } from "entities/chat";
import styles from "./Chat.module.css";

export function Chat({ roomId }) {

    const {
        userLogin
    } = useModel(roomId);

    return (
        <div className={[styles.chat, "fade"].join(" ")}>
            <MessagesList userLogin={userLogin} />
            <SendMessage />
        </div>
    );
}