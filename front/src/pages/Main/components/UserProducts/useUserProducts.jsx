import { useState } from "react";
import { useValidate } from "../../../../hook/useUserStore";
import { useMountEffect } from "../../../../hook/useMountEffect";
import { asyncDeleteProducts, asyncGetUserProducts } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/dataAction";
import { Product } from "../../../../core/model/transport/Product";

export function useUserProducts() {
    const { signOut } = useValidate();
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


    const _asyncGetUserProducts = async () => {
        const response = await asyncGetUserProducts();
        const data = response.getBody();
        const status = response.getStatus();
        _callbackGetUserProducts(status, data);
    }

    const _callbackGetUserProducts = (status, data) => {
        switch (status) {
            case 401:
                signOut();
                break;
            case 200:
                const products = jsonToObjects(data, Product);
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
        const response = await asyncDeleteProducts(jsonProductsId);
        const status = response.getStatus();
        _callbackDeleteInfo(status);
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