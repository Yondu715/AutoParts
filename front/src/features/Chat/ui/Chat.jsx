import { SubmitButton } from "../../../shared/ui";
import { useChat, useMessageForm, useMessages } from "../model";
import styles from "./Chat.module.css";

export function Chat({ roomId }) {

    const {
        userLogin
    } = useChat(roomId);

    return (
        <div className={[styles.chat, "fade"].join(" ")}>
            <Messages userLogin={userLogin} />
            <AddMessageForm userLogin={userLogin} />
        </div>
    );
}


function AddMessageForm({ userLogin }) {
    const {
        message, handlerMessage,
        onEnter, sendMessage
    } = useMessageForm(userLogin);

    return (
        <div className={styles.form}>
            <input value={message} className={styles.inputMessage} onChange={handlerMessage} onKeyDown={onEnter} />
            <div className={styles.btnPlace}>
                <SubmitButton type="info" onClick={sendMessage}>Отправить</SubmitButton>
            </div>
        </div>
    );
}


function Messages({ userLogin }) {
    const {
        messages
    } = useMessages(userLogin);

    return (
        <div className={styles.messages}>
            {messages.map((message) => <Message key={message.id} message={message} userLogin={userLogin} />)}
        </div>
    );
}

function Message({ message, userLogin }) {
    const msgStyle = (message.from === userLogin) ? styles.sendMessage : styles.receiveMessage;
    const messageDate = new Date(message.date);
    let hours = messageDate.getHours();
    let minutes = messageDate.getMinutes();
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes; 
    }
    const sendTime = `${hours}:${minutes}`
    return (
        <div className={[styles.message, msgStyle].join(" ")}>
            <div className={styles.messageInfo}>{message.from} {sendTime}</div>
            <div>{message.content}</div>
        </div>
    );
}