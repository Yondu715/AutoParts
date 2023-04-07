import { useAuth } from "./useAuth";
import { Link } from "react-router-dom";
import { InputBox } from "../../components/InputBox/InputBox";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { StatusError } from "../../components/StatusError/StatusError";
import { REG_ROUTE } from "../../utils/consts";
import styles from "./AuthRegPage.module.css"

export function AuthPage() {

    const {
        handlerForm, error, 
        asyncSendAuthInfo
    } = useAuth();

    return (
        <div className={styles.authRegPage}>
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
        </div>
    );
}