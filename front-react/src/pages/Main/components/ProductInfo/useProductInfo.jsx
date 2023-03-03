import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../../../hook/useValidate";
import { asyncAddToCart, asyncGetProductInfo } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/DataAction";
import { Product } from "../../../../core/model/transport/Product";

export function useProductInfo(id) {
    const [product, setProduct] = useState();
    const navigate = useNavigate();
    const { signOut } = useValidate();

    const _asyncGetProductInfo = async () => {
        const response = await asyncGetProductInfo(id);
        const data = response.getBody();
        const status = response.getStatus();
        _callbackGetProductInfo(status, data);
    }

    const _callbackGetProductInfo = (status, data) => {
        switch (status) {
            case 401:
                signOut();
                navigate("/auth");
                break;
            case 200:
                const product = jsonToObjects(data, Product);
                setProduct(product);
                break;
            default:
                break;
        }
    }

    const _asyncAddToCart = async () => {
        const response = await asyncAddToCart(product);
        const status = response.getStatus();
        _callbackAddCart(status);
    }

    const _callbackAddCart = (status) => {
        switch (status) {
            case 401:
                signOut();
                navigate("/auth");
                break;
            default:
                break;
        }
    }

    return {
        product, _asyncAddToCart, 
        _asyncGetProductInfo
    }
}