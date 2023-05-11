import { useNavigate, useResolvedPath } from "react-router-dom";
import { productModel } from "entities/product";
import { useMountEffect } from "shared/lib/hooks";

export function useProducts() {
    const navigate = useNavigate();
    const products = productModel.useProducts();
    const { getProductsAsync } = productModel.useModel();
    const pathname = useResolvedPath().pathname;

    const onProductInfo = (id) => navigate(pathname + "/" + id);

    useMountEffect(getProductsAsync);

    return {
        products, onProductInfo
    }
}