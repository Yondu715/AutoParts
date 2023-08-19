import { store } from "../store";
import { Provider } from "react-redux";

export const withStore = (component) => () => {
    return (
        <Provider store={store}>
            {component()}
        </Provider>
    );
}