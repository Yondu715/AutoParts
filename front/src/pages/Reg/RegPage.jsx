import { RegistrationForm } from "features/RegistrationForm";
import styles from "./AuthRegPage.module.css";
import { viewerModel } from "entities/viewer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function RegPage() {
    const userInfo = viewerModel.useUserInfo();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo.isAuth){
            navigate("/");
        }
    }, []);
    
    return (
        <div className={styles.authRegPage}>
            <RegistrationForm/>
        </div>
    );
}