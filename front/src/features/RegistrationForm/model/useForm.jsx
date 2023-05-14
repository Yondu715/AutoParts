import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataAction } from "shared/lib/actions";
import { AUTH_ROUTE } from "shared/config";
import { VieverReg, viewerModel } from "entities/viewer";

export function useForm() {
    const initialState = {
        login: "",
        password: "",
        repeatPassword: "",
    }

    const [error, setError] = useState();
    const [form, setForm] = useState(initialState);
    const navigate = useNavigate();

    const handlerForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const { regUserAsync } = viewerModel.useModel();

    const _getRegInfo = () => {
        const user = new VieverReg(form);
        if (!dataAction.checkValid(user.get())) {
            setError("Не все поля были заполнены");
            return;
        }
        const password = user.getPassword();
        const repeat_password = user.getRepeatPassword();
        if (password !== repeat_password) {
            setError("Пароли не совпадают");
            return;
        }
        return user;
    }

    const asyncSendRegInfo = async () => {
        const user = _getRegInfo();
        user && regUserAsync(user.get(), _callbackRegInfo);
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