import { CustomLink } from "../CustomLink/CustomLink";
import styles from "./NavBar.module.css";

export function NavBar({ items }) {
    const menuItems = Object.keys(items);
    return (
        <div className={styles.navBar}>
            <ul>
                {menuItems.map((item) =>
                    <CustomLink key={item} to={items[item]}>{item}</CustomLink>
                )}
            </ul>
        </div>
    );
}