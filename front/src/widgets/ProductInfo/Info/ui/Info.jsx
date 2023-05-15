import { useModel } from "../model";
import { Chat } from "../../Chat";
import { ProductFullInfo } from "entities/product";
import { AddToCart } from "features/product/AddToCart";
import { SubmitButton } from "shared/ui/SubmitButton";
import styles from "./Info.module.css";

export function Info() {
    const {
        product, userLogin,
        openChat, chatIsOpen, id
    } = useModel();

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
                                <img alt="" src={product["image"]} />
                            </div>
                            <div className={styles.chatBtn}>
                                <SubmitButton onClick={openChat} type="info">Открыть чат товара</SubmitButton>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {product && (product["sellerName"] !== userLogin) &&
                <div className={styles.btnPlace}>
                    <AddToCart product={product} />
                </div>
            }
        </div>
    );
}