import { connectToChat } from "../api/APIrequest";

class ChatModel {

    _wsChannel = null;

    connect(roomId) {
        this._wsChannel = connectToChat(roomId);
    }

    closeConnection() {
        if (this._wsChannel) this._wsChannel.close();
    }

    setOnMessage(callback) {
        const timer = setInterval(() => {
            if (!this._wsChannel) return;
            this._wsChannel.onmessage = callback;
            clearInterval(timer);
        });
    }

    sendMessage(message) {
        if (!this._wsChannel) return;
        this._wsChannel.send(message);
    }

    getWsChannel() {
        return this._wsChannel;
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