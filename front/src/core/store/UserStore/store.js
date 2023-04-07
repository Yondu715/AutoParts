import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./UserSlice";
import { chatReducer } from "./ChatSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
    }
});