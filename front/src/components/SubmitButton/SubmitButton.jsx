import styles from "./SubmitButton.module.css"

export function SubmitButton({ type, children, onClick, ...props }) {
    let color = styles.acceptButton;
    if (type === "delete") {
        color = styles.deleteButton;
    }
    else if (type === "info") {
        color = styles.infoButton;
    }
    return (
        <button
            className={[styles.submitButton, color].join(" ")}
            onClick={onClick} {...props}
        >
            {children}
        </button>
    );
}