import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { asyncDeleteFromCart, asyncGetCart } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/DataAction";
import { Product } from "../../../../core/model/transport/Product";
import { useValidate } from "../../../../hook/useValidate";

export function useCart() {
    const { signOut } = useValidate();
    const navigate = useNavigate();
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
                navigate("/auth");
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
                navigate("/auth");
                break;
            case 204:
                setSelectedProducts([]);
                _asyncGetCart();
                break;
            default:
                break;
        }
    }

    return {
        products, selectedProducts, _selectProduct, 
        _asyncGetCart, _asyncSendDeleteInfo
    }
}