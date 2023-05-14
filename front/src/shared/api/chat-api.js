import { dataAction } from "shared/lib/actions";
import { requestAPI } from "./request-api";

let _subscribers = [];
let _wsChannel = null;

const messageHandler = (e) => {
    const newMessages = JSON.parse(e.data);
    _subscribers.forEach(s => s(newMessages));
}

const openConnectionHandler = () => {
    const uuid = dataAction.generateUUID();
    _wsChannel.send(uuid);
}

const connectToChat = (roomId) => {
    _wsChannel = requestAPI.connectToChat(roomId);
    _wsChannel.onopen = openConnectionHandler;
    _wsChannel.onmessage = messageHandler;
}

const closeConnection = () => {
    _subscribers = [];
    _wsChannel?.close();
}

export const chatAPI = {
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