import { useEffect, useState } from "react";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { connectToChat } from "../../core/api/APIrequest";
import { useUserInfo } from "../../hook/useUserInfo";
import styles from "./Chat.module.css";


export function Chat({ roomId }) {
    const [wsChannel, setWsChannel] = useState(null);
    const user = useUserInfo();
    const userLogin = user.login;

    useEffect(() => {
        let ws = connectToChat(roomId);
        setWsChannel(ws);
        return () => {
            ws.close();
        }
    }, [])

    return (
        <div className={[styles.chat, "fade"].join(" ")}>
            <Messages wsChannel={wsChannel} userLogin={userLogin} />
            <AddMessageForm wsChannel={wsChannel} userLogin={userLogin} />
        </div>
    );
}


function AddMessageForm({ wsChannel, userLogin }) {
    const [message, setMessage] = useState("");

    const handlerMessage = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        if (!message) return;
        if (!wsChannel) return;
        const msg = {
            id: Date.now(),
            content: message,
            from: userLogin,
            date: new Date(),
        }
        wsChannel.send(JSON.stringify(msg));
        setMessage("");
    }

    const onEnter = (e) => {
        if (e.keyCode === 13){
            sendMessage();
        }
    }

    return (
        <div className={styles.form}>
            <input value={message} className={styles.inputMessage} onChange={handlerMessage} onKeyDown={onEnter} />
            <div className={styles.btnPlace}>
                <SubmitButton type="info" onClick={sendMessage}>Отправить</SubmitButton>
            </div>
        </div>
    );
}


function Messages({ wsChannel, userLogin }) {
    const [messages, setMessages] = useState([]);

    const messageHandler = (e) => {
        const newMessages = JSON.parse(e.data);
        if (Array.isArray(newMessages)) {
            setMessages(prevMessages => [...prevMessages, ...newMessages]);
        } else {
            setMessages(prevMessages => [...prevMessages, newMessages]);
        }
    }

    useEffect(() => {
        if (!wsChannel) return;
        wsChannel.onmessage = messageHandler;
    }, [wsChannel]);

    return (
        <div className={styles.messages}>
            {messages.map((message) => <Message key={message.id} message={message} userLogin={userLogin} />)}
        </div>
    );
}

function Message({ message, userLogin }) {
    const msgStyle = (message.from === userLogin) ? styles.sendMessage : styles.receiveMessage;
    const messageDate = new Date(message.date);
    const sendTime = `${messageDate.getHours()}:${messageDate.getMinutes()}`
    return (
        <div className={[styles.message, msgStyle].join(" ")}>
            <div className={styles.messageInfo}>{message.from} {sendTime}</div>
            <div>{message.content}</div>
        </div>
    );
}