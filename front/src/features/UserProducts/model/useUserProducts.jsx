import { useState } from "react";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { dataAction } from "shared/lib/actions";
import { productModel } from "entities/product";
import { viewerModel } from "entities/viewer";

export function useUserProducts() {
    const { signOut } = viewerModel.useValidate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const Product = productModel.Product;

    const selectProduct = (id) =>
        setSelectedProducts((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(itemId => itemId !== id);
            } else {
                return [...prevState, id];
            }
        });


    const _asyncGetUserProducts = async () => {
        requestAPI.sendRequest(requestAPI.asyncGetUserProducts, _callbackGetUserProducts);
    }

    const _callbackGetUserProducts = (status, data) => {
        switch (status) {
            case 401:
                signOut();
                break;
            case 200:
                const products = dataAction.jsonToObjects(data, Product);
                setProducts(products);
                break;
            default:
                break;
        }
    }

    const asyncSendDeleteInfo = async () => {
        const jsonProductsId = [];
        selectedProducts.forEach(id => {
            jsonProductsId.push({ id: id });
        });
        requestAPI.sendRequest(() => requestAPI.asyncDeleteProducts(jsonProductsId), _callbackDeleteInfo);
    }

    const _callbackDeleteInfo = (status) => {
        switch (status) {
            case 401:
                signOut();
                break;
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