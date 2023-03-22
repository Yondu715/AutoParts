import styles from "./SelectBox.module.css";

export function SelectBox({ items, onChange, ...props }) {
    const stopProp = (e) => e.stopPropagation();
    return (
        <select className={styles.select} onClick={stopProp} onChange={onChange} {...props}>
            {items.map(
                item => <option key={item}>{item}</option>
            )}
        </select>
    );
}