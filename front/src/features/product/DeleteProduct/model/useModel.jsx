import { productModel } from "entities/product";
import { viewerModel } from "entities/viewer";

export function useModel() {

    const userId = viewerModel.useUserId();

    const { deleteProductsAsync } = productModel.useModel();
    const selectedProducts = productModel.useSelectedProducts();

    const asyncSendDeleteInfo = () => {
        deleteProductsAsync(userId, selectedProducts);
    }

    return { asyncSendDeleteInfo };
}