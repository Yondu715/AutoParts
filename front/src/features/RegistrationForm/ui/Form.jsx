import { Link } from "react-router-dom";
import { StatusError } from "../../../shared/ui/StatusError";
import { SubmitButton } from "../../../shared/ui/SubmitButton";
import { InputBox } from "../../../shared/ui/InputBox";
import { AUTH_ROUTE } from "../../../shared/config";
import { useForm } from "../model";
import styles from "./Form.module.css";


export function Form() {
    const {
        handlerForm, error, asyncSendRegInfo
    } = useForm();

    return (
        <div className={`${styles.authRegBlock} fade`}>
            <span className={`${styles.text} ${styles.title}`}>Регистрация</span>
            <InputBox
                type="text"
                label="Логин"
                name="login"
                onChange={handlerForm}
            />
            <InputBox
                type="password"
                label="Пароль"
                name="password"
                onChange={handlerForm}
            />
            <InputBox
                type="password"
                label="Подтвердите пароль"
                name="repeatPassword"
                onChange={handlerForm}
            />
            <StatusError message={error} />
            <SubmitButton onClick={asyncSendRegInfo}>Зарегистрироваться</SubmitButton>
            <span className={styles.text}>Уже есть аккаунт? <Link to={AUTH_ROUTE}>Авторизоваться</Link></span>
        </div>
    );
}