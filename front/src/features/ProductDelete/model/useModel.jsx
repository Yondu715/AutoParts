import { productModel } from "entities/product";

export function useModel(userId) {
    const { deleteProductsAsync } = productModel.useModel();
    const selectedProducts = productModel.useSelectedProducts();

    const asyncSendDeleteInfo = () => {
        deleteProductsAsync(userId, selectedProducts);
    }

    return { asyncSendDeleteInfo };
}