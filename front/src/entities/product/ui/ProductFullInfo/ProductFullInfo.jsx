import styles from "./ProductFullInfo.module.css";

export function ProductFullInfo({ product }) {
    const { name, sellerName, date, brand, model, price } = product;
    return (
        <div className={styles.info}>
            <span>Название: {name}</span>
            <span>Продавец: {sellerName}</span>
            <span>Дата публикации: {date}</span>
            <span>Марка: {brand}</span>
            <span>Модель: {model}</span>
            <span>Цена: {price} ₽</span>
        </div>
    );
}