import { useModel } from "../model";
import { ProductCard } from "entities/product";
import styles from "./Products.module.css";

export function Products() {
    const {
        products, onProductInfo
    } = useModel();

    return (
        <div className={[styles.products, "fade"].join(" ")}>
            <table>
                <tbody>
                    {products.map((product) =>
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