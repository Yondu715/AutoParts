import { useState } from "react";
import { productModel } from "entities/product";
import { viewerModel } from "entities/viewer";

export function useModel(product) {
    const [error, setError] = useState("");
    const [productAdded, setProductAdded] = useState(false);

    const userId = viewerModel.useUserId();

    const { addProductToCartAsync } = productModel.useModel();

    const asyncAddProduct = async () => {
        addProductToCartAsync(userId, product, _callbackAddProduct);
    }

    const _callbackAddProduct = (status) => {
        switch (status) {
            case 409:
                setError("Данный товар уже добавлен в корзину");
                break;
            case 200:
                setProductAdded(true);
                break;
            default:
                break;
        }
    }

    return {
        error, productAdded, asyncAddProduct
    };
}