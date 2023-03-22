import { useReg } from "./useReg";
import { Link } from "react-router-dom";
import { InputBox } from "../../components/InputBox/InputBox";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { StatusError } from "../../components/StatusError/StatusError";
import { AUTH_ROUTE } from "../../utils/consts";
import styles from "./AuthRegPage.module.css";

export function RegPage() {
    const {
        error, handlerForm,
        _asyncSendRegInfo
    } = useReg();

    return (
        <div className={styles.authRegPage}>
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
                <SubmitButton onClick={_asyncSendRegInfo}>Зарегистрироваться</SubmitButton>
                <span className={styles.text}>Уже есть аккаунт? <Link to={AUTH_ROUTE}>Авторизоваться</Link></span>
            </div>
        </div>
    );
}