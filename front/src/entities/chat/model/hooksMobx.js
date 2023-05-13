import { useEffect, useState } from "react";
import { startMessagesListening, stopMessagesListening, sendMessage, chatStore } from "./store/mobx/store";
import { autorun } from "mobx";

export function useChatListening() {
    const startListening = (roomId) => {
        startMessagesListening(roomId);
    }

    const stopListening = () => {
        stopMessagesListening();
    }

    const sendChatMessage = (message) => {
        sendMessage(message);
    }

    return {
        startListening, stopListening,
        sendChatMessage
    }
}

export function useChatMessages() {
    const [messages, setMessages] = useState(chatStore.chat.messages);
    useEffect(() => {
        function handle(messages) {
            setMessages(messages);
        }
        return autorun(() => {
            handle(chatStore.chat.messages);
        })
    })
    return messages;
}