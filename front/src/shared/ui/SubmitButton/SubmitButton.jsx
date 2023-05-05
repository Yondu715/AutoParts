import styles from "./SubmitButton.module.css"

export function SubmitButton({ type, children, onClick, ...props }) {
    let color;
    switch (type) {
        case "delete":
            color = styles.deleteButton;
            break;
        case "info":
            color = styles.infoButton;
            break;
        case "accept":
            color = styles.acceptButton;
            break;
        default:
            color = styles.acceptButton;
            break;
    }
    return (
        <button
            className={[styles.submitButton, color].join(" ")}
            onClick={onClick}
            {...props}>
            {children}
        </button>
    );
}