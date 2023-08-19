import { useModel } from "../model";
import { ProductCard } from "entities/product";
import { DeleteProduct } from "features/product/DeleteProduct";
import styles from "./UserProducts.module.css";


export function UserProducts() {
    const {
        products, selectedProducts,
        selectProduct
    } = useModel();


    return (
        <div className={[styles.userProducts, "fade"].join(" ")}>
            <div className={styles.products}>
                {products.map((product) =>
                    <ProductCard
                        key={product.id}
                        product={product}
                        className={selectedProducts.includes(product.id) ? styles.active : styles.notActive}
                        onClick={() => selectProduct(product.id)}
                    />
                )}
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <DeleteProduct />
                </div>
            </div>
        </div>
    );
}