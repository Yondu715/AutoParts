import { useEffect, useState } from "react";
import { useUserLogin } from "../../hook/useUserStore";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../core/store/UserStore/ChatSlice";


export function useChat(roomId) {
    const userLogin = useUserLogin();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startMessagesListening(roomId));
        return () => {
            dispatch(stopMessagesListening());
        }
    }, [roomId])

    return {
        userLogin
    }
}

export function useMessageForm(userLogin) {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handlerMessage = (e) => {
        setMessage(e.target.value);
    }

    const sendMessageHandler = () => {
        if (!message) return;
        const msg = {
            id: Date.now(),
            content: message,
            from: userLogin,
            date: new Date(),
        }
        dispatch(sendMessage(msg));
        setMessage("");
    }

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            sendMessageHandler();
        }
    }

    return {
        message, handlerMessage, 
        sendMessageHandler, onEnter,
    }
}

export function useMessages() {
    const messages = useSelector(state => state.chat.messages);

    return {
        messages
    }
}