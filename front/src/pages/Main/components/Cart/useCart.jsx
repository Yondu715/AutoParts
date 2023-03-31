import { useState } from "react";
import { useMountEffect } from "../../../../hook/useMountEffect";
import { useValidate } from "../../../../hook/useStore";
import { asyncDeleteFromCart, asyncGetCart } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/dataAction";
import { Product } from "../../../../core/model/transport/Product";

export function useCart() {
    const { signOut } = useValidate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const _selectProduct = (id) =>
        setSelectedProducts((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter(itemId => itemId !== id);
            } else {
                return [...prevState, id];
            }
        });

    const _asyncGetCart = async () => {
        const response = await asyncGetCart();
        const data = response.getBody();
        const status = response.getStatus();
        _callbackGetCart(status, data);
    }

    const _callbackGetCart = (status, data) => {
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

    const _asyncSendDeleteInfo = async () => {
        const jsonProductsId = [];
        selectedProducts.forEach(id => {
            jsonProductsId.push({ id: id });
        });
        const response = await asyncDeleteFromCart(jsonProductsId);
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
                _asyncGetCart();
                break;
            default:
                break;
        }
    }

    useMountEffect(_asyncGetCart);

    return {
        products, selectedProducts,
        _selectProduct, _asyncSendDeleteInfo
    }
}