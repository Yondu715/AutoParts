import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import { useUserProducts } from "./useUserProducts";
import styles from "./UserProducts.module.css";


export function UserProducts() {
    const {
        products, selectedProducts,
        selectProduct, asyncSendDeleteInfo
    } = useUserProducts();


    return (
        <div className={[styles.userProducts, "fade"].join(" ")}>
            <div className={styles.products}>
                <table>
                    <tbody>
                        {products.map(({ product }) =>
                            <RowElement
                                key={product.id}
                                product={product}
                                className={selectedProducts.includes(product.id) ? styles.active : styles.notActive}
                                onClick={() => selectProduct(product.id)}
                            />
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <SubmitButton type="delete" onClick={asyncSendDeleteInfo}>Удалить</SubmitButton>
                </div>
            </div>
        </div>
    );
}


function RowElement({ product, ...props }) {
    const { id, image, name, sellerName, date, brand, model, price } = product;
    return (
        <tr {...props}>
            <td>
                <div className={styles.product}>
                    <div className={styles.image}>
                        <img alt="" src={image} />
                    </div>
                    <div className={styles.productInfo}>
                        <span>{id}</span>
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