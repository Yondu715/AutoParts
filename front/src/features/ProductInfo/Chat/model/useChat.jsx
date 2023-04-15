import { useEffect, useState } from "react";
import { viewerModel } from "entities/viewer";
import { chatModel } from "entities/chat";

export function useChat(roomId) {
    const userLogin = viewerModel.useUserLogin();
    const { startListening, stopListening } = chatModel.useChatListening();
    useEffect(() => {
        startListening(roomId);
        return () => {
            stopListening();
        }
    }, [])

    return {
        userLogin
    }
}

export function useMessageForm(userLogin) {
    const [message, setMessage] = useState("");
    const { sendChatMessage } = chatModel.useChatListening();

    const handlerMessage = (e) => {
        setMessage(e.target.value);
    }

    const sendMessageHandler = () => {
        if (!message) return;
        const msg = {
            id: Date.now(),
            content: message,
            from: userLogin,
            date: new Date(),
        }
        sendChatMessage(msg);
        setMessage("");
    }

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            sendMessageHandler();
        }
    }

    return {
        message, handlerMessage,
        sendMessageHandler, onEnter,
    }
}

export function useMessages() {
    const messages = chatModel.useChatMessages();
    return {
        messages
    }
}