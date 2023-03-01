import styles from "./inputBox.module.css"

export function InputBox({value, type, name, label, onChange }) {
    return (
        <div className={styles.inputBox}>
            <label htmlFor={type}>{label}</label>
            <input
                id={type}
                className={styles.inputBoxText}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete="off" />
            <span className={styles.inputBoxBar}></span>
        </div>
    );
}
