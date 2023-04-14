import { useDispatch, useSelector } from "react-redux";
import { reduxStore } from "./store";

export function useChatListening() {
    const dispatch = useDispatch();

    const startListening = (roomId) => {
        dispatch(reduxStore.startMessagesListening(roomId));
    }

    const stopListening = () => {
        dispatch(reduxStore.stopMessagesListening());
    }

    const sendChatMessage = (message) => {
        dispatch(reduxStore.sendMessage(message));
    }

    return {
        startListening, stopListening,
        sendChatMessage
    }
}

export function useChatMessages() {
    return useSelector(state => state.chat.messages);
}