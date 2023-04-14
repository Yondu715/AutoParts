import { useState } from "react";
import { LoaderSpinner } from "../shared/ui/LoaderSpinner";
import { useMountEffect } from "../shared/hooks";
import { LS_TOKEN } from "../shared/config";
import { viewerModel } from "../entities/viewer";
import { checkAuth } from "../processes/checkAuth";
import { buildProvider } from "./store";
import { buildRouter } from "./router";
import "./styles/index.css";
import "./styles/animations.css";


export function Routing() {
    const Router = buildRouter();
    const [loading, setLoading] = useState(true);
    const { signIn } = viewerModel.useValidate();
    const check = async () => {
        if (localStorage.getItem(LS_TOKEN) === null) {
            setLoading(false);
            return;
        }
        try {
            const data = await checkAuth();
            const { isAuth, login, role } = data;
            signIn(isAuth, login, role);
        }
        finally {
            setLoading(false);
        }
    };

    useMountEffect(check);

    if (loading) {
        return (
            <LoaderSpinner />
        );
    }

    return (
        <Router />
    );
}

export function App() {
    const Provider = buildProvider();
    return (
        <Provider>
            <Routing />
        </Provider>
    );
}