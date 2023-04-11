import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./userStore/userSlice";
import { chatReducer } from "./chatStore/chatSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
    }
});