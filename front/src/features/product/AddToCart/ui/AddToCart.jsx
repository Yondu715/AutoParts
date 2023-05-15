import { useModel } from "../model"
import { StatusError } from "shared/ui/StatusError";
import { SubmitButton } from "shared/ui/SubmitButton";

export function AddToCart({ product }) {

    const {
        error, productAdded, asyncAddProduct
    } = useModel(product);

    return (
        <>
            <StatusError message={error} />
            <SubmitButton disabled={productAdded} onClick={asyncAddProduct}>{productAdded ? "Товар был успешно добавлен" : "Добавить товар в корзину"}</SubmitButton>
        </>
    );
}