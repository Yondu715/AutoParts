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
        setSelectedProduct(state, action) {
            if (!state.selectedProducts.includes(action.payload)) {
                state.selectedProducts = [...state.selectedProducts, action.payload];
            } else {
                state.selectedProducts = state.selectedProducts.filter(id => id !== action.payload);
            }
        }
    }
});

export const { setProducts, setSelectedProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;

export const getProductsAsync = (errorHandler) => async (dispatch) => {
    const response = await requestAPI.asyncGetAllProducts();
    const status = response.getStatus();
    if (status >= 400) {
        errorHandler(status);
        return;
    }
    const products = response.getBody();
    dispatch(setProducts(products));
}

export const getUserProductsAsync = (userId, errorHandler) => async (dispatch) => {
    const response = await requestAPI.asyncGetUserProducts(userId);
    const status = response.getStatus();
    if (status >= 400) {
        errorHandler(status);
        return;
    }
    const products = response.getBody();
    dispatch(setProducts(products));
}

export const deleteUserProducts = (userId, productsId, errorHandler) => async (dispatch) => {
    const response = await requestAPI.asyncDeleteProducts(userId, productsId);
    const status = response.getStatus();
    if (status >= 400) {
        errorHandler(status);
        return;
    }
    dispatch(getUserProductsAsync(userId));
}

