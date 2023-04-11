import { Link } from "react-router-dom";
import { StatusError } from "../../../../components/StatusError/StatusError";
import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import { InputBox } from "../../../../components/InputBox/InputBox";
import { useAuthForm } from "./useAuthForm";
import { REG_ROUTE } from "../../../../utils/consts";
import styles from "./AuthorizationForm.module.css";


export function AuthorizationForm() {

    const {
        asyncSendAuthInfo, error, handlerForm
    } = useAuthForm();

    return (
        <div className={[styles.authRegBlock, "fade"].join(" ")}>
            <span className={[styles.text, styles.title].join(" ")}>Авторизация</span>
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
            <StatusError message={error} />
            <SubmitButton onClick={asyncSendAuthInfo}>Войти</SubmitButton>
            <span className={styles.text}>Еще нет аккаунта? <Link to={REG_ROUTE}>Зарегистрироваться</Link></span>
        </div>
    );
}