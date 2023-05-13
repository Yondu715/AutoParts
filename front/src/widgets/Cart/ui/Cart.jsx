import { useCart } from "../model";
import { ProductCard } from "entities/product";
import { ProductCartDelete } from "features/ProductCartDelete";
import styles from "./Cart.module.css";


export function Cart() {
    const {
        products, selectedProducts, 
        selectProductHandler
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
                                onClick={() => selectProductHandler(product.id)}
                                className={selectedProducts.includes(product.id) ? styles.active : styles.notActive}
                            />

                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <ProductCartDelete/>
                </div>
            </div>
        </div>
    );
}