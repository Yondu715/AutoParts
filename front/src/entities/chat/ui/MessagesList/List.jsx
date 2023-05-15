import { MessageCard } from "../MessageCard";
import { chatModel } from "entities/chat";
import styles from "./List.module.css";

export function List({ userLogin }) {
    const messages = chatModel.useChatMessages();

    return (
        <div className={styles.messages}>
            {messages.map((message) => <MessageCard key={message.id} message={message} userLogin={userLogin} />)}
        </div>
    );
}