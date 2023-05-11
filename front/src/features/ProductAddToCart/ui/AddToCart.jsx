import { StatusError } from "shared/ui/StatusError";
import { SubmitButton } from "shared/ui/SubmitButton";
import { useModel } from "../model"

export function AddToCart({ userId, product }) {

    const {
        error, productAdded, asyncAddProduct
    } = useModel(userId, product);

    return (
        <>
            <StatusError message={error} />
            <SubmitButton disabled={productAdded} onClick={asyncAddProduct}>{productAdded ? "Товар был успешно добавлен" : "Добавить товар в корзину"}</SubmitButton>
        </>
    );
}