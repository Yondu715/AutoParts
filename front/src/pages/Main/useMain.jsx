import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../hook/useValidate";

export function useMain() {
    const [logoutAnimation, setAnimation] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useValidate();

    const menuItems = {
        "Купить": "products",
        "Продать": "sale",
        "Мои товары": "myproducts",
        "Корзина": "cart"
    }

    const logout = () => {
        setAnimation(true);
        setTimeout(() => {
            localStorage.clear();
            signOut();
            navigate("/auth");
        }, 800);
    }

    return {
        logoutAnimation, menuItems,  
        logout
    }
}