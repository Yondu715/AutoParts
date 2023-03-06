import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import { useMountEffect } from "../../../../hook/useMountEffect";
import { useProductInfo } from "./useProductInfo";
import styles from "./ProductInfo.module.css";
import { useParams } from "react-router-dom";

export function ProductInfo() {

    const { id } = useParams();

    const {
        product, _asyncAddToCart,
        _asyncGetProductInfo
    } = useProductInfo(id);

    useMountEffect(_asyncGetProductInfo);

    return (
        <div className={styles.productInfo}>
            <div className={[styles.wrapProduct, "fade"].join(" ")}>
                {product &&
                    <div className={styles.product}>
                        <div className={styles.leftPart}>
                            <div className={styles.info}>
                                <span>Название: {product.get()["name"]}</span>
                                <span>Продавец: {product.get()["sellerName"]}</span>
                                <span>Дата публикации: {product.get()["date"]}</span>
                                <span>Марка: {product.get()["brand"]}</span>
                                <span>Модель: {product.get()["model"]}</span>
                                <span>Цена: {product.get()["price"]} ₽</span>
                            </div>
                        </div>
                        <div className={styles.rightPart}>
                            <div className={styles.image}>
                                <img alt="" src={product.get()["image"]} />
                            </div>
                        </div>
                    </div>
                }
            </div>
            { product && (product.get()["sellerName"] !== localStorage.getItem("login")) &&
                <div className={styles.btnPlace}>
                    <SubmitButton content="Добавить в корзину" onClick={_asyncAddToCart} />
                </div>
            }
        </div>
    );
}