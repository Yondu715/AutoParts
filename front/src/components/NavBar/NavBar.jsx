import { useState } from "react";
import styles from "./NavBar.module.css";

export function NavBar({ items, changeItem, initialItem }) {
    const [currActiveItem, setCurrActiveItem] = useState(initialItem);
    const menuItems = Object.keys(items);

    const handlerItem = (e) => {
        const itemName = e.target.textContent;
        setCurrActiveItem(itemName);
        changeItem(items[itemName]);
    }
    return (
        <div className={styles.navBar}>
            <ul>
                {menuItems.map((menuItem) =>
                    <li key={menuItem}>
                        <button
                            className={(currActiveItem === menuItem) ? styles.active : styles.notActive}
                            onClick={handlerItem}
                        >{menuItem}</button>
                    </li>
                )}
            </ul>
        </div>
    );
}