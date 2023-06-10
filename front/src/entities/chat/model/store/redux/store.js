import { createSlice } from "@reduxjs/toolkit";
import { mapMessage, mapMessageList } from "entities/chat/lib";
import { chatAPI } from "shared/api";

let _messageHandler = null;

const messageHandler = (dispatch) => {
    if (_messageHandler === null) {
        _messageHandler = (messages) => {
            if (Array.isArray(messages)) {
                messages = mapMessageList(messages);
            } else {
                messages = mapMessage(messages);
            }
            dispatch(chatSlice.actions.messagesReceived(messages));
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
    dispatch(chatSlice.actions.messagesCleared());
}

export const sendMessage = (message) => async () => {
    chatAPI.sendMessage(message);
}

const initialState = {
    messages: []
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
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

export const chatReducer = chatSlice.reducer;