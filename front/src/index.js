import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { WithAuthProvider } from "./hoc/WithAuthProvider";
import "./style/index.css";
import "./style/animations.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <WithAuthProvider>
        <App />
    </WithAuthProvider>
);

