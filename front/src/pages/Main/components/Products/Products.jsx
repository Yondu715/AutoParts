import { useProducts } from "./useProducts";
import styles from "./Products.module.css";

export function Products() {
    const {
        products, _onProductInfo
    } = useProducts();

    return (
        <div className={[styles.products, "fade"].join(" ")}>
            <table>
                <tbody>
                    {products.map(({ product }) =>
                        <RowElement
                            key={product.id}
                            product={product}
                            onClick={() => _onProductInfo(product.id)}
                        />
                    )}
                </tbody>
            </table>
        </div>
    );
}


function RowElement({ product, ...props }) {
    const { image, name, sellerName, date, brand, model, price } = product;
    return (
        <tr {...props}>
            <td>
                <div className={styles.product}>
                    <div className={styles.image}>
                        <img alt="" src={image} />
                    </div>
                    <div className={styles.productInfo}>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.sellerName}>{sellerName}</span>
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