import { viewerModel } from "entities/viewer";
import { AuthorizationForm } from "features/AuthorizationForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./AuthRegPage.module.css"

export function AuthPage() {
    const userInfo = viewerModel.useUserInfo();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (userInfo.isAuth) {
            navigate("/");
        }
    }, [])

    return (
        <div className={styles.authRegPage}>
            <AuthorizationForm />
        </div>
    );
}