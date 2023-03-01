import { Link } from "react-router-dom";
import { InputBox } from "../../components/InputBox/InputBox";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { StatusError } from "../../components/StatusError/StatusError";

import styles from "./authRegPage.module.css"
import { useAuth } from "./useAuth";

export function AuthPage() {

    const initialForm = {
        login: "",
        password: "",
    }
    
    const {
        handlerForm, error, 
        _asyncSendAuthInfo
    } = useAuth(initialForm);

    return (
        <div className={styles.authRegPage}>
            <div className={`${styles.authRegBlock} fade`}>
                <span className={`${styles.text} ${styles.title}`}>Авторизация</span>
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
                <StatusError
                    message={error}
                />
                <SubmitButton
                    content="Войти"
                    onClick={_asyncSendAuthInfo}
                />
                <span className={styles.text}>Еще нет аккаунта? <Link to="/reg">Зарегистрироваться</Link></span>
            </div>
        </div>
    );
}