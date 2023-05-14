import { makeAutoObservable } from "mobx"
import { mapMessage, mapMessageList } from "entities/chat/lib";
import { chatAPI } from "shared/api";

let _messageHandler = null;

const messageHandler = () => {
    if (_messageHandler === null) {
        _messageHandler = (messages) => {
            if (Array.isArray(messages)) {
                messages = mapMessageList(messages);
            } else {
                messages = mapMessage(messages);
            }
            chatStore.messagesReceived(messages);
        }
    }
    return _messageHandler;
}

export const startMessagesListening = (roomId) => {
    chatAPI.start(roomId);
    chatAPI.subscribe(messageHandler());
}

export const stopMessagesListening = () => {
    chatAPI.unsubscribe(messageHandler());
    chatAPI.stop();
    chatStore.messagesCleared();
}

export const sendMessage = (message) => {
    chatAPI.sendMessage(message);
}


const initialState = {
    messages: []
}

export const chatStore = makeAutoObservable({
    chat: {
        ...initialState
    },
    messagesReceived(messages) {
        if (Array.isArray(messages)) {
            this.chat.messages = [...this.chat.messages, ...messages];
        } else {
            this.chat.messages = [...this.chat.messages, messages];
        }
    },
    messagesCleared() {
        this.chat.messages = [];
    }
});