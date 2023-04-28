import { SubmitButton } from "shared/ui/SubmitButton";
import { useCart } from "../model";
import styles from "./Cart.module.css";
import { ProductCard } from "entities/product";


export function Cart() {
    const {
        products, selectedProducts,
        asyncSendDeleteInfo, selectProduct
    } = useCart();

    return (
        <div className={[styles.cart, "fade"].join(" ")}>
            <div className={styles.products}>
                <table>
                    <tbody>
                        {products.map(({ product }) =>
                            <ProductCard
                                key={product.id}
                                product={product.product}
                                onClick={() => selectProduct(product.id)}
                                className={selectedProducts.includes(product.id) ? styles.active : styles.notActive}
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