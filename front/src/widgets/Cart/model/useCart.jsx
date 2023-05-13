import { useMountEffect } from "shared/lib/hooks";
import { productModel } from "entities/product";
import { viewerModel } from "entities/viewer";

export function useCart() {
    const userId = viewerModel.useUserId();
    const products = productModel.useProducts();
    const selectedProducts = productModel.useSelectedProducts();
    const { selectProduct } = productModel.useModel();
    const { getCartAsync } = productModel.useModel();

    const selectProductHandler = (id) => {
        selectProduct(id);
    }

    useMountEffect(() => getCartAsync(userId));

    return {
        products, selectedProducts,
        selectProductHandler
    }
}