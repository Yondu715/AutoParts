import { configureStore } from "@reduxjs/toolkit"
import { viewerModel } from "entities/viewer";
import { chatModel } from "entities/chat";
import { productModel } from "entities/product";
import { userModel } from "entities/user";

export const globalReduxStore = configureStore({
    reducer: {
        viewer: viewerModel.viewerReducer,
        chat: chatModel.chatReducer,
        product: productModel.productReducer,
        user: userModel.userReducer,
    },
});