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

export const productReducer = productSlice.reducer;