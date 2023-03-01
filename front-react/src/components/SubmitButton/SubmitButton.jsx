import styles from "./submitButton.module.css"

export function SubmitButton({type, content, onClick}) {
    const color = (type === "delete" ? styles.deleteButton : styles.acceptButton);
    return (
        <button className={`${styles.submitButton} ${color}`} onClick={onClick}>{content}</button>
    );
}