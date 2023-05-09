import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync, getUserProductsAsync, setSelectedProduct } from "./store";

export function useProduct() {
    const dispatch = useDispatch();

    const selectProduct = (id) => {
        dispatch(setSelectedProduct(id));
    }

    const getProducts = (errorHandler) => {
        dispatch(getProductsAsync(errorHandler));
    }

    const getUserProducts = (userId, errorHandler) => {
        dispatch(getUserProductsAsync(userId, errorHandler));
    }

    const deleteUserProducts = (userId, productsId, errorHandler) => {
        dispatch(deleteUserProducts(userId, productsId, errorHandler));
    }

    return { selectProduct, getProducts, getUserProducts, deleteUserProducts }
}

export function useProducts() {
    return useSelector(state => state.product.products);
}

export function useSelectedProducts() {
    return useSelector(state => state.product.selectedProducts);
}
