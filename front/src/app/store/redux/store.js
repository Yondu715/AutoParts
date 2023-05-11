import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import { viewerModel } from "entities/viewer";
import { chatModel } from "entities/chat";
import { productModel } from "entities/product";
import { userModel } from "entities/user";

const globalReduxStore = configureStore({
    reducer: {
        viewer: viewerModel.viewerReducer,
        chat: chatModel.chatReducer,
        product: productModel.productReducer,
        user: userModel.userReducer,
    },
});


export function buildProvider() {
    return ({children}) => 
        <Provider store={globalReduxStore}>
            {children}
        </Provider>
}