import { Routing } from "./router";
import { withProviders } from "./providers";
import "./styles/index.css";

export const App = withProviders(() => {
    return (
        <Routing />
    );
})