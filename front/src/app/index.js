import { useState } from "react";
import { viewerModel } from "entities/viewer";
import { buildProvider } from "./store";
import { buildRouter } from "./router";
import { dataAction } from "shared/lib/actions";
import { requestAPI } from "shared/api";
import { LoaderSpinner } from "shared/ui/LoaderSpinner";
import { useMountEffect } from "shared/lib/hooks";
import { LS_TOKEN } from "shared/config";
import "./styles/index.css";

function Routing() {
    const Router = buildRouter();
    const [loading, setLoading] = useState(true);
    const { signIn, signOut } = viewerModel.useModel();

    requestAPI.setRequestInterceptor((config) => {
        config.headers = { ...config.headers, Authorization: localStorage.getItem(LS_TOKEN) };
    });

    requestAPI.setResponseInterceptor((status) => {
        if (status === 401) {
            signOut();
        }
    })

    const check = async () => {
        if (localStorage.getItem(LS_TOKEN) === null) {
            setLoading(false);
            return;
        }
        try {
            const response = await requestAPI.asyncAuth();
            const status = response.getStatus();
            if (status >= 400) return;
            const token = localStorage.getItem(LS_TOKEN);
            const payload = dataAction.getPayloadFromToken(token);
            const userInfo = {
                isAuth: true,
                ...payload
            }
            signIn(userInfo);
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