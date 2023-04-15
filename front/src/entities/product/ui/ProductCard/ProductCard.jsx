import styles from "./ProductCard.module.css";

export function ProductCard({ product, ...props }) {
    const { image, name, date, brand, model, price } = product;
    return (
        <tr {...props}>
            <td>
                <div className={styles.product}>
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
            </td>
        </tr>
    );
}