import { useDispatch, useSelector } from "react-redux";
import {
    addProductToCartAsyncFx, deleteFromCartAsyncFx, deleteProductsAsyncFx,
    getCartAsyncFx, getProductByIdAsyncFx, getProductsAsyncFx,
    getUserProductsAsyncFx, saleProductAsyncFx, selectProductFx
} from "./store";

export function useModel() {
    const dispatch = useDispatch();

    const getProductsAsync = async () => {
        dispatch(getProductsAsyncFx());
    }

    const getUserProductsAsync = async (userId) => {
        dispatch(getUserProductsAsyncFx(userId));
    }

    const getCartAsync = async (userId) => {
        dispatch(getCartAsyncFx(userId));
    }

    const deleteProductsAsync = async (userId, productsId) => {
        dispatch(deleteProductsAsyncFx(userId, productsId));
    }

    const deleteProductsFromCartAsync = async (userId, productsId) => {
        dispatch(deleteFromCartAsyncFx(userId, productsId));
    }

    const selectProduct = (id) => {
        dispatch(selectProductFx(id));
    }

    const saleProduct = async (product) => {
        saleProductAsyncFx(product);
    }

    const getProductByIdAsync = async (productId) => {
        dispatch(getProductByIdAsyncFx(productId));
    }

    const addProductToCartAsync = async (userId, product, callback) => {
        addProductToCartAsyncFx(userId, product, callback);
    }

    return {
        getProductsAsync, getUserProductsAsync, deleteProductsAsync,
        selectProduct, saleProduct, getProductByIdAsync,
        addProductToCartAsync, getCartAsync, deleteProductsFromCartAsync
    };
}

export function useProducts() {
    return useSelector(state => state.product.products);
}

export function useSelectedProducts() {
    return useSelector(state => state.product.selectedProducts);
}

export function useProduct(id) {
    const products = useProducts();
    return products.find((product) => product.id === id);
}
