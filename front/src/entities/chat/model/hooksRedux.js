import { useDispatch, useSelector } from "react-redux";
import { startMessagesListening, stopMessagesListening, sendMessage } from "./store/redux/store";


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