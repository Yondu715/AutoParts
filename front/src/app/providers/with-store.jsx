import { globalReduxStore } from "../store";
import { Provider } from "react-redux";

export const withMobxStore = (component) => () => {
    return (
        <>
            {component()}
        </>
    );
}

export const withReduxStore = (component) => () => {
    return (
        <Provider store={globalReduxStore}>
            {component()}
        </Provider>
    );
}