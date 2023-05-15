import { productModel } from "entities/product";
import { viewerModel } from "entities/viewer";
import { useMountEffect } from "shared/lib/hooks";

export function useModel() {
    const products = productModel.useProducts()
    const selectedProducts = productModel.useSelectedProducts();
    const { getUserProductsAsync, selectProduct } = productModel.useModel();
    const userId = viewerModel.useUserId();

    useMountEffect(() => getUserProductsAsync(userId));

    return {
        products, selectedProducts,
        selectProduct
    }
}