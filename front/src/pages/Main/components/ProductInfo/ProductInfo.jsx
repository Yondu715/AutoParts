import { useParams } from "react-router-dom";
import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import { useProductInfo } from "./useProductInfo";
import styles from "./ProductInfo.module.css";
import { Chat } from "../../../Chat/Chat";

export function ProductInfo() {

    const { id } = useParams();

    const {
        product, _asyncAddToCart,
        userLogin, openChat, chatIsOpen
    } = useProductInfo(id);

    if (chatIsOpen) {
        return (
            <Chat roomId={id}/>
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
                    <SubmitButton onClick={_asyncAddToCart}>Добавить в корзину</SubmitButton>
                </div>
            }
        </div>
    );
}


function InfoBlock({ product }) {
    const {name, sellerName, date, brand, model, price} = product.get();
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