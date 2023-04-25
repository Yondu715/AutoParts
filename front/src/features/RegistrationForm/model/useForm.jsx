import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestAPI } from "shared/api";
import { dataAction } from "shared/lib/actions";
import { userModel } from "entities/user";
import { AUTH_ROUTE } from "shared/config";

export function useForm(){
    const initialState = {
        login: "",
        password: "",
        repeatPassword: "",
    }
    const User = userModel.User;

    const [error, setError] = useState();
    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();

    const handlerForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const _getRegInfo = () => {
        return new User(form);
    }

    const asyncSendRegInfo = async () => {
        const user = _getRegInfo();
        if (!dataAction.checkValid(user)) {
            setError("Не все поля были заполнены");
            return;
        }

        const password = user.get()["password"];
        const repeat_password = user.get()["repeatPassword"];
        if (password !== repeat_password) {
            setError("Пароли не совпадают");
            return;
        }
        requestAPI.sendRequest(() => requestAPI.asyncReg(user.get()), _callbackRegInfo);
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
        error, asyncSendRegInfo
    }
}