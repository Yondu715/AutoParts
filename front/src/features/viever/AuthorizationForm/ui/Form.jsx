import { Link } from "react-router-dom";
import { useModel } from "../model";
import { StatusError } from "shared/ui/StatusError";
import { TextArea } from "shared/ui/TextArea";
import { SubmitButton } from "shared/ui/SubmitButton";
import { PATH } from "shared/config";
import styles from "./Form.module.css";


export function Form() {

    const {
        asyncSendAuthInfo, error, handlerForm
    } = useModel();

    return (
        <div className={[styles.authRegBlock, "fade"].join(" ")}>
            <span className={[styles.text, styles.title].join(" ")}>Авторизация</span>
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
            <StatusError message={error} />
            <SubmitButton onClick={asyncSendAuthInfo}>Войти</SubmitButton>
            <span className={styles.text}>Еще нет аккаунта? <Link to={PATH.reg}>Зарегистрироваться</Link></span>
        </div>
    );
}