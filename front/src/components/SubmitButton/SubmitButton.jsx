import styles from "./SubmitButton.module.css"

export function SubmitButton({ type, children, onClick, ...props }) {
    const color = (type === "delete" ? styles.deleteButton : styles.acceptButton);
    return (
        <button
            className={[styles.submitButton, color].join(" ")}
            onClick={onClick} {...props}
        >
            {children}
        </button>
    );
}