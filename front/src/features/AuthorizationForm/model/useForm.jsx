import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewerModel, VieverAuth } from "entities/viewer";
import { dataAction } from "shared/lib/actions";
import {
    ADMIN_ROUTE, APPLICATIONS_ROUTE,
    LS_TOKEN, MAIN_ROUTE, PRODUCTS_ROUTE
} from "shared/config";

export function useForm() {
    const initialState = {
        login: "",
        password: "",
    }

    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState("");
    const handlerForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const { signIn, authUserAsync } = viewerModel.useModel();

    const _getAuthInfo = () => {
        const user = new VieverAuth(form);
        
        if (!dataAction.checkValid(user.get())) {
            setError("Не все поля были заполнены");
            return;
        }
        return user;
    };

    const asyncSendAuthInfo = async () => {
        const user = _getAuthInfo();
        user && authUserAsync(user.get(), _callbackAuth);
    };

    const _callbackAuth = (status, data) => {
        switch (status) {
            case 401:
                setError("Неправильный логин или пароль");
                break;
            case 200:
                const token = data["token"];
                const payload = dataAction.getPayloadFromToken(token);
                const userInfo = {
                    isAuth: true,
                    ...payload
                }
                localStorage.setItem(LS_TOKEN, token);
                signIn(userInfo);
                switch (payload.role) {
                    case "client":
                        navigate([MAIN_ROUTE, PRODUCTS_ROUTE].join("/"));
                        break;
                    case "admin":
                        navigate([ADMIN_ROUTE, APPLICATIONS_ROUTE].join("/"));
                        break;
                    default:
                        break;
                }
                break;

            default:
                break;
        }
    };

    return {
        error, handlerForm,
        asyncSendAuthInfo
    }
}