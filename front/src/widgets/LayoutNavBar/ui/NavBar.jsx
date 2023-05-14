import { CustomLink } from "shared/ui/CustomLink";
import styles from "./NavBar.module.css";

export function NavBar({ items, ...props }) {
    const menuItems = Object.keys(items);
    return (
        <div className={styles.navBar}>
            <ul>
                {menuItems.map((item) =>
                    <CustomLink key={item} to={items[item]} {...props} >{item}</CustomLink>
                )}
            </ul>
        </div>
    );
}