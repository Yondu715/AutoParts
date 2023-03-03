import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../../../hook/useValidate";
import { asyncDeleteProducts, asyncGetUserProducts } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/DataAction";
import { Product } from "../../../../core/model/transport/Product";

export function useUserProducts() {
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
        const response = await asyncDeleteProducts(jsonProductsId);
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
                _asyncGetUserProducts();
                break;
            default:
                break;
        }
    }

    return {
        products, selectedProducts, _selectProduct,
        _asyncGetUserProducts, _asyncSendDeleteInfo
    }
}