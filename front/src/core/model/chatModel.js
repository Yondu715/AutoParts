import { connectToChat } from "../api/APIrequest";

class ChatModel {

    _subscribers = [];
    _wsChannel = null;

    subscribe(callback) {
        this._subscribers.push(callback);
        return () => {
            this._subscribers = this._subscribers.filter(s => s !== callback);
        }
    }

    unsubscribe(callback) {
        this._subscribers = this._subscribers.filter(s => s !== callback);
    }

    connect(roomId) {
        this._wsChannel = connectToChat(roomId);
        this._wsChannel.onmessage = this.messageHandler;
    }

    closeConnection() {
        this._subscribers = [];
        this._wsChannel?.close();
    }

    sendMessage(message) {
        this._wsChannel?.send(JSON.stringify(message));
    }

    messageHandler = (e) => {
        const newMessages = JSON.parse(e.data);
        this._subscribers.forEach(s => s(newMessages));
    }

}

export class ChatModelFactory {
    static _chatModel = null;

    static _createIntance() {
        return new ChatModel();
    }

    static createInstance() {
        if (ChatModelFactory._chatModel === null) {
            ChatModelFactory._chatModel = ChatModelFactory._createIntance();
        }
        return ChatModelFactory._chatModel;
    }
}