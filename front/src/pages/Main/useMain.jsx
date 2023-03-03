import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../hook/useValidate";
import { Cart } from "./components/Cart/Cart";
import { Products } from "./components/Products/Products";
import { Sale } from "./components/Sale/Sale";
import { UserProducts } from "./components/UserProducts/UserProducts";



export function useMain() {
    const [logoutAnimation, setAnimation] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useValidate();
    const items = {
        "Купить": <Products />,
        "Продать": <Sale />,
        "Мои товары": <UserProducts />,
        "Корзина": <Cart />
    }
    const initialItem = Object.keys(items)[0];
    const [currComp, setCurrComp] = useState(items[initialItem]);

    const logout = () => {
        setAnimation(true);
        setTimeout(() => {
            localStorage.clear();
            signOut();
            navigate("/auth");
        }, 800);
    }

    return {
        logoutAnimation, items, currComp, 
        setCurrComp, logout, initialItem
    }
}