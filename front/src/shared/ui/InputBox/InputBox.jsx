import { memo } from "react";
import styles from "./InputBox.module.css"

export function InputBox({ value, type, name, label, onChange, ...props }) {
    return (
        <div className={styles.inputBox}>
            {label && <label>{label}</label>}
            <input
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

export const MemoizedInputBox = memo(InputBox);
