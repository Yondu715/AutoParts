import { useEffect } from "react";
import { viewerModel } from "entities/viewer";
import { chatModel } from "entities/chat";

export function useModel(roomId) {
    const userLogin = viewerModel.useUserLogin();
    const { startListening, stopListening } = chatModel.useChatListening();
    useEffect(() => {
        startListening(roomId);
        return () => {
            stopListening();
        }
    }, [])

    return {
        userLogin
    }
}