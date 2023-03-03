import { useAuth } from "./useAuth";
import { Link } from "react-router-dom";
import { InputBox } from "../../components/InputBox/InputBox";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { StatusError } from "../../components/StatusError/StatusError";
import styles from "./AuthRegPage.module.css"

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