import styles from "./Message.module.css";

export function MessageCard({ message, userLogin }) {
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
    const sendTime = `${hours}:${minutes}`;
    return (
        <div className={[styles.message, msgStyle].join(" ")}>
            <div className={styles.messageInfo}>{message.from} {sendTime}</div>
            <div>{message.content}</div>
        </div>
    );
}