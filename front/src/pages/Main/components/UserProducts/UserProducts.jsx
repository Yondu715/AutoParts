import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import { useUserProducts } from "./useUserProducts";
import styles from "./UserProducts.module.css";


export function UserProducts() {
    const {
        products, selectedProducts, 
        _selectProduct, _asyncSendDeleteInfo
    } = useUserProducts();


    return (
        <div className={[styles.userProducts, "fade"].join(" ")}>
            <div className={styles.products}>
                <table>
                    <tbody>
                        {products.map(({ product: { id, image, name, sellerName, date, brand, model, price } }) =>
                            <tr key={id} onClick={() => _selectProduct(id)} className={selectedProducts.includes(id) ? styles.active : styles.notActive}>
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
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <SubmitButton type="delete" content="Удалить" onClick={_asyncSendDeleteInfo} />
                </div>
            </div>
        </div>
    );
}