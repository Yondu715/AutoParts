import styles from "./InputBox.module.css"

export function InputBox({ value, type, name, label, onChange }) {
    return (
        <div className={styles.inputBox}>
            <label>{label}</label>
            <input
                className={styles.inputBoxText}
                id={type}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete="off"
            />
            <span className={styles.inputBoxBar}></span>
        </div>
    );
}
