import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationForm } from "features/RegistrationForm";
import { viewerModel } from "entities/viewer";
import styles from "./AuthRegPage.module.css";

export function RegPage() {
    const userInfo = viewerModel.useUserInfo();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.isAuth){
            navigate("/");
        }
    }, [navigate, userInfo.isAuth]);
    
    return (
        <div className={styles.authRegPage}>
            <RegistrationForm/>
        </div>
    );
}