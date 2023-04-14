import { ProductCard } from "../../../entities/product";
import { useProducts } from "../model";
import styles from "./Products.module.css";

export function Products() {
    const {
        products, onProductInfo
    } = useProducts();

    return (
        <div className={[styles.products, "fade"].join(" ")}>
            <table>
                <tbody>
                    {products.map(({ product }) =>
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => onProductInfo(product.id)}
                        />
                    )}
                </tbody>
            </table>
        </div>
    );
}