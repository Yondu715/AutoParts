import styles from "./ProductCard.module.css";

export function ProductCard({ product, className, ...props }) {
    const { image, name, date, brand, model, price } = product;
    return (
        <div className={[styles.product, className].join(' ')} {...props}>
            <div className={styles.image}>
                <img alt="" src={image} />
            </div>
            <div className={styles.productInfo}>
                <span className={styles.name}>{name}</span>
                <span className={styles.date}>{date}</span>
                <span className={styles.brand}>{brand}</span>
                <span className={styles.model}>{model}</span>
            </div>
            <div className={styles.price}>
                <span>{price} ₽</span>
            </div>
        </div>

    );
}