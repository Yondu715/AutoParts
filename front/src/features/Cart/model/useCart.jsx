import { useState } from "react";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { dataAction } from "shared/lib/actions";
import { Product } from "shared/lib/transport";
import { viewerModel } from "entities/viewer";

export function useCart() {
    const { signOut } = viewerModel.useValidate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const selectProduct = (id) =>
        setSelectedProducts((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(itemId => itemId !== id);
            } else {
                return [...prevState, id];
            }
        });

    const _asyncGetCart = async () => {
        requestAPI.sendRequest(requestAPI.asyncGetCart, _callbackGetCart);
    }

    const _callbackGetCart = (status, data) => {
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
        requestAPI.sendRequest(() => requestAPI.asyncDeleteFromCart(jsonProductsId), _callbackDeleteInfo)
    }

    const _callbackDeleteInfo = (status) => {
        switch (status) {
            case 401:
                signOut();
                break;
            case 204:
                setSelectedProducts([]);
                _asyncGetCart();
                break;
            default:
                break;
        }
    }

    useMountEffect(_asyncGetCart);

    return {
        products, selectedProducts,
        selectProduct, asyncSendDeleteInfo
    }
}