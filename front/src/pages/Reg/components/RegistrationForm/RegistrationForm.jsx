import { InputBox } from "../../../../components/InputBox/InputBox";
import { StatusError } from "../../../../components/StatusError/StatusError";
import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import { useRegForm } from "./useRegForm";
import { AUTH_ROUTE } from "../../../../utils/consts";
import styles from "./RegistrationForm.module.css";
import { Link } from "react-router-dom";


export function RegistrationForm() {
    const {
        handlerForm, error, asyncSendRegInfo
    } = useRegForm();

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