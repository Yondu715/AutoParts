import { productModel } from "entities/product";
import { viewerModel } from "entities/viewer";

export function useModel() {

    const userId = viewerModel.useUserId();
    
    const { deleteProductsFromCartAsync } = productModel.useModel();
    const selectedProducts = productModel.useSelectedProducts();

    const asyncSendDeleteInfo = () => {
        deleteProductsFromCartAsync(userId, selectedProducts);
    }

    return { asyncSendDeleteInfo };
}