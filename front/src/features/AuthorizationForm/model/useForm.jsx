import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestAPI } from "../../../shared/api";
import { dataAction } from "../../../shared/lib";
import { User } from "../../../shared/transport";
import { viewerModel } from "../../../entities/viewer";
import {
    ADMIN_ROUTE, APPLICATIONS_ROUTE,
    LS_TOKEN, MAIN_ROUTE, PRODUCTS_ROUTE
} from "../../../shared/config";

export function useForm() {
    const initialState = {
        login: "",
        password: "",
    }

    const [form, setForm] = useState(initialState);
    const handlerForm = useCallback((e) => setForm({ ...form, [e.target.name]: e.target.value }), []);

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { signIn } = viewerModel.useValidate();

    const _getAuthInfo = () => {
        return new User(form);
    };

    const asyncSendAuthInfo = async () => {
        localStorage.clear();
        const user = _getAuthInfo();
        if (!dataAction.checkValid(user)) {
            setError("Не все поля были заполнены");
            return;
        }
        requestAPI.sendRequest(() => requestAPI.asyncAuth(user.get()), _callbackAuth);
    };

    const _callbackAuth = (status, data) => {
        switch (status) {
            case 401:
                setError("Неправильный логин или пароль");
                break;
            case 200:
                const token = data["token"];
                const tokenBody = token.split(".")[1];
                const decodedBody = atob(tokenBody);
                const payload = JSON.parse(decodedBody);
                const login = payload["login"];
                const role = payload["role"];
                localStorage.setItem(LS_TOKEN, token);
                signIn(true, login, role);
                switch (role) {
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