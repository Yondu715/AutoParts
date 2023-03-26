import { useEffect, useState } from "react";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
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
        <div className={styles.chat}>
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
        if (wsChannel) {
            const msg = {
                content: message,
                from: userLogin,
                date: new Date(),
            }
            wsChannel.send(JSON.stringify(msg));
        }
        setMessage("");
    }

    return (
        <div className={styles.form}>
            <input value={message} className={styles.inputMessage} onChange={handlerMessage} />
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
        if (wsChannel) {
            wsChannel.onmessage = messageHandler;
        }
    }, [wsChannel]);

    return (
        <div className={styles.messages}>
            {messages.map((message) => <Message data={message} userLogin={userLogin} />)}
        </div>
    );
}

function Message({ data, userLogin }) {
    const msgStyle = (data.from === userLogin) ? styles.sendMessage : styles.receiveMessage;
    return (
        <div className={[styles.message, msgStyle].join(" ")}>
            <div className={styles.messageInfo}>{data.from}</div>
            <div>{data.content}</div>
        </div>
    );
}