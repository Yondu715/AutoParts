import { SubmitButton } from "../../../shared/ui";
import { ProductCard } from "../../../entities/product";
import { useUserProducts } from "../model";
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
                            <ProductCard
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