import { productModel } from "entities/product";

export function useModel(userId) {
    
    const { deleteProductsFromCartAsync } = productModel.useModel();
    const selectedProducts = productModel.useSelectedProducts();

    const asyncSendDeleteInfo = () => {
        deleteProductsFromCartAsync(userId, selectedProducts);
    }

    return { asyncSendDeleteInfo };
}