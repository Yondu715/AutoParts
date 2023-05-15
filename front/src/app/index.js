import { useState } from "react";
import { LoaderSpinner } from "shared/ui/LoaderSpinner";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { LS_TOKEN } from "shared/config";
import { viewerModel } from "entities/viewer";
import { buildProvider } from "./store";
// import { buildProvider } from "./store/mobx";
import { buildRouter } from "./router";
import { dataAction } from "shared/lib/actions";
import "./styles/index.css";
import "./styles/animations.css";

let userInfo = {
    isAuth: false,
    login: null,
    role: null,
}

const checkAuth = async () => {
    const response = await requestAPI.asyncAuth();
    const status = response.getStatus();
    const data = _callbackCheckAuth(status);
    return data;
};

function _callbackCheckAuth(status) {
    switch (status) {
        case 204:
            const token = localStorage.getItem("token");
            const payload = dataAction.getPayloadFromToken(token);
            userInfo = {
                isAuth: true,
                ...payload
            }
            break;
        default:
            break;
    }
    return userInfo;
}

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
            const data = await checkAuth();
            signIn(data);
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