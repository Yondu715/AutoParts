import { requestAPI } from "../api/request-api";

let _subscribers = [];
let _wsChannel = null;

const messageHandler = (e) => {
    const newMessages = JSON.parse(e.data);
    _subscribers.forEach(s => s(newMessages));
}

const connectToChat = (roomId) => {
    _wsChannel = requestAPI.connectToChat(roomId);
    _wsChannel.onmessage = messageHandler;
}

const closeConnection = () => {
    _subscribers = [];
    _wsChannel?.close();
}

export const chatModel = {
    start(roomId) {
        connectToChat(roomId);
    },

    stop() {
        closeConnection();
    },

    subscribe(callback) {
        _subscribers.push(callback);
        return () => {
            this.unsubscribe(callback);
        }
    },

    unsubscribe(callback) {
        _subscribers = _subscribers.filter(s => s !== callback);
    },

    sendMessage(message) {
        _wsChannel?.send(JSON.stringify(message));
    },
}