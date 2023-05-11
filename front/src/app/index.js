import { useState } from "react";
import { LoaderSpinner } from "shared/ui/LoaderSpinner";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { LS_TOKEN } from "shared/config";
import { viewerModel } from "entities/viewer";
import { buildProvider } from "./store/redux";
// import { buildProvider } from "./store/mobx";
import { buildRouter } from "./router";
import "./styles/index.css";
import "./styles/animations.css";

let userInfo = {
    isAuth: false,
    login: null,
    role: null,
}

const checkAuth = async () => {
    await requestAPI.sendRequest(requestAPI.asyncAuth, _callbackCheckAuth);
    return userInfo;
};

function _callbackCheckAuth(status) {
    switch (status) {
        case 204:
            const tokenBody = localStorage.getItem(LS_TOKEN).split(".")[1];
            const decodedBody = atob(tokenBody);
            const payload = JSON.parse(decodedBody);
            const login = payload["login"];
            const role = payload["role"];
            const id = payload["id"];
            userInfo = {
                isAuth: true,
                login: login,
                role: role,
                id: id
            }
            break;
        default:
            break;
    }
}

function Routing() {
    const Router = buildRouter();
    const [loading, setLoading] = useState(true);
    const { signIn, signOut } = viewerModel.useValidate();
    const userInfo = viewerModel.useUserInfo();
    const check = async () => {
        if (localStorage.getItem(LS_TOKEN) === null) {
            setLoading(false);
            return;
        }
        try {
            const data = await checkAuth();
            const { isAuth, login, role, id } = data;
            signIn(isAuth, login, role, id);
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

    if (userInfo.isAuth) {
        requestAPI.addInterceptor(401, () => signOut());
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