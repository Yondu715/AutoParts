import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import { viewerModel } from "../../entities/viewer";
import { chatModel } from "../../entities/chat";

const store = configureStore({
    reducer: {
        viewer: viewerModel.reduxStore.viewerReducer,
        chat: chatModel.reduxStore.chatReducer,
    }
});

export function buildProvider() {
    return ({children}) => 
        <Provider store={store}>
            {children}
        </Provider>
}