import { createSlice } from "@reduxjs/toolkit";
import { chatAPI } from "../../../../../shared/api";

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
    chatAPI.start(roomId);
    chatAPI.subscribe(messageHandler(dispatch));
}

export const stopMessagesListening = () => async (dispatch) => {
    chatAPI.unsubscribe(messageHandler(dispatch));
    chatAPI.stop();
    dispatch(messagesCleared());
}

export const sendMessage = (message) => async () => {
    chatAPI.sendMessage(message);
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

