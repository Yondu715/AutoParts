import { useState } from "react";
import { useValidate } from "./hook/useValidate";
import { useMountEffect } from "./hook/useMountEffect";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter/AppRouter";
import { LoadingPage } from "./pages/Loading/LoadingPage";
import { asyncAuth } from "./core/api/APIrequest";


export function App() {
    const [loading, setLoading] = useState(true);
    const { signIn } = useValidate();

    const check = () => {
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
        if (localStorage.getItem("token") === null) {
            return userInfo;
        }
        const response = await asyncAuth();
        const status = response.getStatus();

        switch (status) {
            case 401:
                return userInfo;
            case 200:
                const tokenBody = localStorage.getItem("token").split(".")[1];
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
        return (<LoadingPage></LoadingPage>);
    }

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}