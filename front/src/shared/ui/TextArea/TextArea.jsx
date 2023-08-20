import { useId } from "react";
import styles from "./TextArea.module.css"

export function TextArea({ value, type, name, label, onChange, ...props }) {
    const textId = useId();
    return (
        <div className={styles.inputBox}>
            {
                label && <label htmlFor={textId}>{label}</label>
            }
            <input
                id={textId}
                className={styles.inputBoxText}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete="off"
                {...props}
            />
            <span className={styles.inputBoxBar}></span>
        </div>
    );
}