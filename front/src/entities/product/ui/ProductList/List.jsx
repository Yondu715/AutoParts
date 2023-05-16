import { ProductCard } from "../ProductCard";
import styles from "./List.module.css";

export function List({products, onClickItem}){    

    return (
        <div className={[styles.products, "fade"].join(" ")}>
            <table>
                <tbody>
                    {products.map((product) =>
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => onClickItem(product.id)}
                        />
                    )}
                </tbody>
            </table>
        </div>
    );
}