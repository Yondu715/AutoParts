import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { asyncReg } from "../../core/api/APIrequest";
import { checkValid } from "../../core/model/DataAction";
import { User } from "../../core/model/transport/User";
import { AUTH_ROUTE } from "../../utils/consts";

export function useReg() {
    const initialForm = {
        login: "",
        password: "",
        repeatPassword: "",
    }

    const [error, setError] = useState();
    const [form, setForm] = useState(initialForm);
    const navigate = useNavigate();

    const handlerForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const _getRegInfo = () => {
        return new User(form);
    }
    const _asyncSendRegInfo = async () => {
        const user = _getRegInfo();
        if (!checkValid(user)) {
            setError("Не все поля были заполнены");
            return;
        }

        const password = user.get()["password"];
        const repeat_password = user.get()["repeatPassword"];
        if (password !== repeat_password) {
            setError("Пароли не совпадают");
            return;
        }
        const response = await asyncReg(user);
        const status = response.getStatus();
        _callbackRegInfo(status);
    }

    const _callbackRegInfo = (status) => {
        switch (status) {
            case 200:
                navigate(AUTH_ROUTE);
                break;
            case 409:
                setError("Нельзя использовать данный логин");
                break;
            default:
                break;
        }
    }

    return {
        form, handlerForm,
        error, _asyncSendRegInfo
    }
}