import { useDispatch, useSelector } from "react-redux";
import { deleteProductsAsyncFx, getProductsAsyncFx, getUserProductsAsyncFx, saleProductAsyncFx, selectProductFx } from "./store";

export function useModel() {
    const dispatch = useDispatch();

    const getProductsAsync = () => {
        dispatch(getProductsAsyncFx());
    }

    const getUserProductsAsync = (userId) => {
        dispatch(getUserProductsAsyncFx(userId));
    }

    const deleteProductsAsync = (userId, productsId) => {
        dispatch(deleteProductsAsyncFx(userId, productsId));
    }

    const selectProduct = (id) => {
        dispatch(selectProductFx(id));
    }

    const saleProduct = (product) => {
        saleProductAsyncFx(product);
    }
    
    return { getProductsAsync, getUserProductsAsync, deleteProductsAsync, selectProduct, saleProduct };
}

export function useProducts() {
    return useSelector(state => state.product.products);
}

export function useSelectedProducts() {
    return useSelector(state => state.product.selectedProducts);
}
