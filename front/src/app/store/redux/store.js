import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import { viewerModel } from "entities/viewer";
import { chatModel } from "entities/chat";
import { productModel } from "entities/product";

const globalReduxStore = configureStore({
    reducer: {
        viewer: viewerModel.viewerReducer,
        chat: chatModel.chatReducer,
        product: productModel.productReducer,
    },
});


export function buildProvider() {
    return ({children}) => 
        <Provider store={globalReduxStore}>
            {children}
        </Provider>
}