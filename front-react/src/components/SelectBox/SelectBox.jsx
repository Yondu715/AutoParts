import styles from "./SelectBox.module.css";

export function SelectBox({items, onChange}){
    return (
        <select className={styles.select} onClick={(e) => e.stopPropagation()} onChange={onChange}>
            {items.map(item => <option key={item}>{item}</option>)}
        </select>
    );
}