import { useMountEffect } from "../../../../hook/useMountEffect";
import { useProducts } from "./useProducts";
import { ProductInfo } from "../ProductInfo/ProductInfo";
import styles from "./Products.module.css";

export function Products() {
    const {
        products, _getAllProducts,
        _onProductInfo
    } = useProducts();

    useMountEffect(_getAllProducts);

    return (
        <div className={[styles.products, "fade"].join(" ")}>
            <table>
                <tbody>
                    {products.map(({ product: { id, image, name, sellerName, date, brand, model, price } }) =>
                        <tr key={id} onClick={() => _onProductInfo(id)}>
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
                    )}
                </tbody>
            </table>
        </div>
    );
}