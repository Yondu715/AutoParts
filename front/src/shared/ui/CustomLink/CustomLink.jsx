import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./CustomLink.module.css";

export function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});
    return (
        <li className={[styles.item, isActive ? styles.active : ""].join(" ")}>
            <Link to={to} {...props} >{children}</Link>
        </li>
    );
}