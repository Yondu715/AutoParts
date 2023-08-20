import { Link } from "react-router-dom";
import { useModel } from "../model";
import { StatusError } from "shared/ui/StatusError";
import { SubmitButton } from "shared/ui/SubmitButton";
import { TextArea } from "shared/ui/TextArea";
import { PATH } from "shared/config";
import styles from "./Form.module.css";


export function Form() {
    const {
        handlerForm, error, asyncSendRegInfo
    } = useModel();

    return (
        <div className={`${styles.authRegBlock} fade`}>
            <span className={`${styles.text} ${styles.title}`}>Регистрация</span>
            <TextArea
                type="text"
                label="Логин"
                name="login"
                onChange={handlerForm}
            />
            <TextArea
                type="password"
                label="Пароль"
                name="password"
                onChange={handlerForm}
            />
            <TextArea
                type="password"
                label="Подтвердите пароль"
                name="repeatPassword"
                onChange={handlerForm}
            />
            <StatusError message={error} />
            <SubmitButton onClick={asyncSendRegInfo}>Зарегистрироваться</SubmitButton>
            <span className={styles.text}>Уже есть аккаунт? <Link to={PATH.auth}>Авторизоваться</Link></span>
        </div>
    );
}