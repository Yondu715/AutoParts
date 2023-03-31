import { useEffect, useState } from "react";
import { ChatModelFactory } from "../../core/model/chatModel";
import { useUserLogin } from "../../hook/useStore";

export function useChat(roomId) {
    const chatModel = ChatModelFactory.createInstance();
    const userLogin = useUserLogin();
    
    useEffect(() => {
        chatModel.connect(roomId);
        return () => {
            chatModel.closeConnection();
        }
    }, [roomId])

    return {
        userLogin
    }
}

export function useMessageForm(userLogin) {
    const chatModel = ChatModelFactory.createInstance();
    const [message, setMessage] = useState("");

    const handlerMessage = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        if (!message) return;
        const msg = {
            id: Date.now(),
            content: message,
            from: userLogin,
            date: new Date(),
        }
        chatModel.sendMessage(JSON.stringify(msg));
        setMessage("");
    }

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            sendMessage();
        }
    }

    return {
        message, handlerMessage, 
        sendMessage, onEnter,
    }
}

export function useMessages() {
    const chatModel = ChatModelFactory.createInstance();
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
        chatModel.setOnMessage(messageHandler);
    }, []);

    return {
        messages
    }
}