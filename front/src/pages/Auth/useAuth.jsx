import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../hook/useStore";
import { asyncAuth } from "../../core/api/APIrequest";
import { checkValid } from "../../core/model/dataAction";
import { User } from "../../core/model/transport/User";
import {
    ADMIN_ROUTE, APPLICATIONS_ROUTE,
    LS_TOKEN, MAIN_ROUTE, PRODUCTS_ROUTE
} from "../../utils/consts";

export function useAuth() {

    const initialState = {
        login: "",
        password: "",
    }

    const [form, setForm] = useState(initialState);
    const handlerForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { signIn } = useValidate();

    const _getAuthInfo = () => {
        return new User(form);
    };

    const _asyncSendAuthInfo = async () => {
        localStorage.clear();
        const user = _getAuthInfo();
        if (!checkValid(user)) {
            setError("Не все поля были заполнены");
            return;
        }
        const response = await asyncAuth(user);
        const data = response.getBody();
        const status = response.getStatus();
        _callbackAuth(status, data);
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
        _asyncSendAuthInfo
    }
}