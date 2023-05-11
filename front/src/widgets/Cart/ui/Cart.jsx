import { useCart } from "../model";
import { ProductCard } from "entities/product";
import { ProductCartDelete } from "features/ProductCartDelete";
import styles from "./Cart.module.css";


export function Cart() {
    const {
        products, selectedProducts, 
        userId, selectProduct
    } = useCart();

    return (
        <div className={[styles.cart, "fade"].join(" ")}>
            <div className={styles.products}>
                <table>
                    <tbody>
                        {products.map((product) =>
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => selectProduct(product.id)}
                                className={selectedProducts.includes(product.id) ? styles.active : styles.notActive}
                            />

                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <ProductCartDelete userId={userId}/>
                </div>
            </div>
        </div>
    );
}