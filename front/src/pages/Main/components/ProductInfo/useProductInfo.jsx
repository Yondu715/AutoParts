import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../../../hook/useValidate";
import { useMountEffect } from "../../../../hook/useMountEffect";
import { asyncAddToCart, asyncGetProductInfo } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/DataAction";
import { Product } from "../../../../core/model/transport/Product";
import { AUTH_ROUTE, MAIN_ROUTE, PRODUCTS_ROUTE } from "../../../../utils/consts";

export function useProductInfo(id) {
    const [product, setProduct] = useState();
    const navigate = useNavigate();
    const { signOut } = useValidate();

    const _asyncGetProductInfo = async () => {
        if (isNaN(id)) {
            navigate([MAIN_ROUTE, PRODUCTS_ROUTE].join("/"));
            return;
        }
        const response = await asyncGetProductInfo(id);
        const data = response.getBody();
        const status = response.getStatus();
        _callbackGetProductInfo(status, data);
    }

    const _callbackGetProductInfo = (status, data) => {
        switch (status) {
            case 401:
                signOut();
                navigate(AUTH_ROUTE);
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
                navigate(AUTH_ROUTE);
                break;
            default:
                break;
        }
    }

    useMountEffect(_asyncGetProductInfo);

    return {
        product, _asyncAddToCart,
    }
}