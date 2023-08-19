import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "./CustomLink.module.css";

export function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});
    return (
        <li>
            <Link className={[styles.link, isActive ? styles.active : ""].join(' ')} to={to} {...props} >{children}</Link>
        </li>
    );
}