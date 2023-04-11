import { useDispatch, useSelector } from "react-redux";
import {
    sendMessage,
    startMessagesListening,
    stopMessagesListening
} from "../store/chatStore/chatSlice";

export function useChatListening() {
    const dispatch = useDispatch();

    const startListening = (roomId) => {
        dispatch(startMessagesListening(roomId));
    }

    const stopListening = () => {
        dispatch(stopMessagesListening());
    }

    const sendChatMessage = (message) => {
        dispatch(sendMessage(message));
    }

    return {
        startListening, stopListening,
        sendChatMessage
    }
}

export function useChatMessages() {
    return useSelector(state => state.chat.messages);
}