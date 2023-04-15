import { StatusError } from "shared/ui/StatusError";
import { SubmitButton } from "shared/ui/SubmitButton";
import { ProductFullInfo } from "entities/product";
import { Chat } from "../../Chat";
import { useInfo } from "../model";
import styles from "./Info.module.css";

export function Info() {
    const {
        product, asyncAddProduct, productAdded,
        userLogin, openChat, chatIsOpen, error,
        id
    } = useInfo();

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
                            <ProductFullInfo product={product} />
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