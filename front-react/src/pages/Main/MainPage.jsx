import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import { useValidate } from "../../hook/useValidate";
import { Cart } from "./components/Cart/Cart";
import { Products } from "./components/Products/Products";
import { Sale } from "./components/Sale/Sale";
import { UserProducts } from "./components/UserProducts/UserProducts";
import styles from "./mainPage.module.css";

export function MainPage() {
    const [logoutAnimation, setAnimation] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useValidate();
    const items = {
        "Купить": <Products/>,
        "Продать": <Sale/>,
        "Мои товары": <UserProducts/>,
        "Корзина": <Cart/>
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
        <div className={styles.mainPage}>
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