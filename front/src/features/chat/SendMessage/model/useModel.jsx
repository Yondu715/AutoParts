import { useState } from "react";
import { chatModel } from "entities/chat";
import { viewerModel } from "entities/viewer";

export function useModel() {
    const [message, setMessage] = useState("");
    const { sendChatMessage } = chatModel.useChatListening();
    const userLogin = viewerModel.useUserLogin();
    
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