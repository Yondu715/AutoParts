import { useState } from "react";
import { useValidate } from "./hook/useValidate";
import { useMountEffect } from "./hook/useMountEffect";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter/AppRouter";
import { LoaderSpinner } from "./components/LoaderSpinner/LoaderSpinner";
import { asyncAuth } from "./core/api/APIrequest";
import { LS_TOKEN } from "./utils/consts";


export function App() {
    const [loading, setLoading] = useState(true);
    const { signIn } = useValidate();

    const check = () => {
        if (localStorage.getItem(LS_TOKEN) === null) {
            setLoading(false);
            return;
        }
        checkLogin().then(
            data => {
                const { isAuth, login, role } = data;
                signIn(isAuth, login, role);
            }
        ).finally(() => setLoading(false));
    };

    useMountEffect(check);


    const checkLogin = async () => {
        let userInfo = {
            isAuth: false,
            login: null,
            role: null,
        }

        const response = await asyncAuth();
        const status = response.getStatus();

        switch (status) {
            case 401:
                return userInfo;
            case 204:
                const tokenBody = localStorage.getItem(LS_TOKEN).split(".")[1];
                const decodedBody = atob(tokenBody);
                const payload = JSON.parse(decodedBody);
                const login = payload["login"];
                const role = payload["role"];
                userInfo = {
                    isAuth: true,
                    login: login,
                    role: role,
                }
                return userInfo;

            default:
                return userInfo;
        }
    };



    if (loading) {
        return (
            <LoaderSpinner />
        );
    }

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}