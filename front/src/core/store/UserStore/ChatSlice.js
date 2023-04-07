import { createSlice } from "@reduxjs/toolkit";
import { ChatModelFactory } from "../../model/chatModel";

const chatModel = ChatModelFactory.createInstance();

let _messageHandler = null;

const messageHandler = (dispatch) => {
    if (_messageHandler === null) {
        _messageHandler = (messages) => {
            dispatch(messagesReceived(messages));
        }
    }
    return _messageHandler;
}

export const startMessagesListening = (roomId) => async (dispatch) => {
    chatModel.connect(roomId);
    chatModel.subscribe(messageHandler(dispatch));
}

export const stopMessagesListening = () => async (dispatch) => {
    chatModel.unsubscribe(messageHandler(dispatch));
    chatModel.closeConnection();
    dispatch(messagesCleared());
}

export const sendMessage = (message) => async (dispatch) => {
    chatModel.sendMessage(message);
}


const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: []
    },
    reducers: {
        messagesReceived(state, action) {
            const messages = action.payload;
            if (Array.isArray(messages)) {
                state.messages = [...state.messages, ...messages]
            } else {
                state.messages = [...state.messages, messages]
            }
        },
        messagesCleared(state) {
            state.messages = [];
        }
    }
});

export const { messagesCleared, messagesReceived } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;

