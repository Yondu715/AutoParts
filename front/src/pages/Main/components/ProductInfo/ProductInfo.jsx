import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import { useProductInfo } from "./useProductInfo";
import { StatusError } from "../../../../components/StatusError/StatusError";
import { Chat } from "../Chat/Chat";
import styles from "./ProductInfo.module.css";
export function ProductInfo() {

    const {
        product, asyncAddProduct, productAdded,
        userLogin, openChat, chatIsOpen, error,
        id
    } = useProductInfo();

    if (chatIsOpen) {
        return (
            <Chat roomId={id} />
        );
    }

    return (
        <div className={styles.productInfo}>
            <div className={[styles.wrapProduct, "fade"].join(" ")}>
                {product &&
                    <div className={styles.product}>
                        <div className={styles.leftPart}>
                            <InfoBlock product={product} />
                        </div>
                        <div className={styles.rightPart}>
                            <div className={styles.image}>
                                <img alt="" src={product.get()["image"]} />
                            </div>
                            <div className={styles.chatBtn}>
                                <SubmitButton onClick={openChat} type="info">Открыть чат товара</SubmitButton>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {product && (product.get()["sellerName"] !== userLogin) &&
                <div className={styles.btnPlace}>
                    <StatusError message={error} />
                    <SubmitButton disabled={productAdded} onClick={asyncAddProduct}>{productAdded ? "Товар был успешно добавлен" : "Добавить товар в корзину"}</SubmitButton>
                </div>
            }
        </div>
    );
}


function InfoBlock({ product }) {
    const { name, sellerName, date, brand, model, price } = product.get();
    return (
        <div className={styles.info}>
            <span>Название: {name}</span>
            <span>Продавец: {sellerName}</span>
            <span>Дата публикации: {date}</span>
            <span>Марка: {brand}</span>
            <span>Модель: {model}</span>
            <span>Цена: {price} ₽</span>
        </div>
    );
}