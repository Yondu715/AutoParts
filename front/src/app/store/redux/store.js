import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import { viewerModel } from "entities/viewer";
import { chatModel } from "entities/chat";

const globalReduxStore = configureStore({
    reducer: {
        viewer: viewerModel.viewerReducer,
        chat: chatModel.chatReducer,
    }
});

export function buildProvider() {
    return ({children}) => 
        <Provider store={globalReduxStore}>
            {children}
        </Provider>
}