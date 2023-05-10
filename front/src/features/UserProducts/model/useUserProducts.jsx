import { useState } from "react";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { dataAction } from "shared/lib/actions";
import { Product } from "entities/product";
import { viewerModel } from "entities/viewer";

export function useUserProducts() {
    const { signOut } = viewerModel.useValidate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const userId = viewerModel.useUserId();
    const selectProduct = (id) =>
        setSelectedProducts((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(itemId => itemId !== id);
            } else {
                return [...prevState, id];
            }
        });


    const _asyncGetUserProducts = async () => {
        requestAPI.sendRequest(() => requestAPI.asyncGetUserProducts(userId), _callbackGetUserProducts);
    }

    const _callbackGetUserProducts = (status, data) => {
        switch (status) {
            case 200:
                const products = dataAction.jsonToObjects(data, Product);
                setProducts(products);
                break;
            default:
                break;
        }
    }

    const asyncSendDeleteInfo = async () => {
        requestAPI.sendRequest(() => requestAPI.asyncDeleteProducts(userId, selectedProducts), _callbackDeleteInfo);
    }

    const _callbackDeleteInfo = (status) => {
        switch (status) {
            case 204:
                setSelectedProducts([]);
                _asyncGetUserProducts();
                break;
            default:
                break;
        }
    }

    useMountEffect(_asyncGetUserProducts);

    return {
        products, selectedProducts, 
        selectProduct, asyncSendDeleteInfo
    }
}