import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../hook/useValidate";
import { asyncAuth } from "../../core/api/APIrequest";
import { checkValid } from "../../core/model/DataAction";
import { User } from "../../core/model/transport/User";

export function useAuth() {

    const initialForm = {
        login: "",
        password: "",
    }

    const [form, setForm] = useState(initialForm);
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
                localStorage.setItem("token", token);
                localStorage.setItem("login", login);
                signIn(true, login, role);
                switch (role) {
                    case "client":
                        navigate("/main");
                        break;
                    case "admin":
                        navigate("/admin");
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