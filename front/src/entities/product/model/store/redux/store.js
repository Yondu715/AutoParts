import { createSlice } from "@reduxjs/toolkit";
import { requestAPI } from "shared/api";

const initialState = {
    products: [],
    selectedProducts: []
}

const productSlice = createSlice({
    name: "product",
    initialState: {
        ...initialState
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload
        },
        addToSelectedProducts(state, action) {
            if (!state.selectedProducts.includes(action.payload)) {
                state.selectedProducts = [...state.selectedProducts, action.payload];
            } else {
                state.selectedProducts = state.selectedProducts.filter(id => id !== action.payload);
            }
        },
        clearSelectedProducts(state) {
            state.selectedProducts = [];
        }
    }
});

export const selectProductFx = (id) => (dispatch) => {
    dispatch(productSlice.actions.addToSelectedProducts(id));
}

export const getProductsAsyncFx = () => async (dispatch) => {
    const response = await requestAPI.asyncGetAllProducts();
    const products = response.getBody();
    dispatch(productSlice.actions.setProducts(products));
}

export const getUserProductsAsyncFx = (userId) => async (dispatch) => {
    const response = await requestAPI.asyncGetUserProducts(userId);
    const products = response.getBody();
    dispatch(productSlice.actions.setProducts(products));
}

export const deleteProductsAsyncFx = (userId, productsId) => async (dispatch) => {
    await requestAPI.asyncDeleteProducts(userId, productsId);
    dispatch(productSlice.actions.clearSelectedProducts());
    dispatch(getUserProductsAsyncFx(userId));
}

export const saleProductAsyncFx = async (product) => {
    await requestAPI.asyncSaleProduct(product);
}

export const addProductToCartAsyncFx = async (userId, product, callback) => {
    const response = await requestAPI.asyncAddToCart(userId, product);
    const status = response.getStatus();
    callback && callback(status);
}

export const getProductByIdAsyncFx = (productId) => async (dispatch) => {
    const response = await requestAPI.asyncGetProductInfo(productId);
    const product = response.getBody();
    dispatch(productSlice.actions.setProducts([product]));
}

export const getCartAsyncFx = (userId) => async (dispatch) => {
    const response = await requestAPI.asyncGetCart(userId);
    const products = response.getBody();
    const mapProducts = [];
    for (let index = 0; index < products.length; index++) {
        const product = products[index];
        mapProducts.push({ ...product.product, id: product.id});
    }
    dispatch(productSlice.actions.setProducts(mapProducts));
}

export const deleteFromCartAsyncFx = (userId, productsId) => async (dispatch) => {
    await requestAPI.asyncDeleteFromCart(userId, productsId);
    dispatch(productSlice.actions.clearSelectedProducts());
    dispatch(getCartAsyncFx(userId));
}

export const productReducer = productSlice.reducer;