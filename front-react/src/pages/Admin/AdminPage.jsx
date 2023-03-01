import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import { Applications } from "./components/Applicatons/Applicatons";
import { Users } from "./components/Users/Users";
import styles from "./adminPage.module.css";
import { useValidate } from "../../hook/useValidate";

export function AdminPage() {
    const [logoutAnimation, setAnimation] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useValidate();
    const items = {
        "Заявки": <Applications />,
        "Пользователи": <Users />,

    }
    const initialItem = Object.keys(items)[0];
    const [currComp, setCurrComp] = useState(items[initialItem]);

    const _logout = () => {
        setAnimation(true);
        setTimeout(() => {
            localStorage.clear();
            signOut();
            navigate("/auth");
        }, 800);
    }

    return (
        <div className={styles.adminPage}>
            <span className={`${styles.overPage} ${logoutAnimation ? "cover" : ""}`}></span>
            <Header
                name="Autoparts"
                username={localStorage.getItem("login")}
                onClick={_logout}
            />
            <div className={styles.wrapContent}>
                <NavBar
                    items={items}
                    changeItem={setCurrComp}
                    initialItem={initialItem}
                />
                <div className={styles.content}>
                    {currComp}
                </div>
            </div>
        </div>
    );
}