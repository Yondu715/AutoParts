import { useMountEffect } from "shared/lib/hooks";
import { productModel } from "entities/product";
import { viewerModel } from "entities/viewer";

export function useUserProducts() {
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