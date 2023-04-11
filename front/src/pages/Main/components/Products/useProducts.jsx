import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../../../hook/useUserStore";
import { useMountEffect } from "../../../../hook/useMountEffect";
import { requestAPI } from "../../../../core/api/request-api";
import { jsonToObjects } from "../../../../core/model/dataAction";
import { Product } from "../../../../core/model/transport/Product";
import { MAIN_ROUTE, PRODUCTS_ROUTE } from "../../../../utils/consts";

export function useProducts() {
    const { signOut } = useValidate();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const _asyncGetProducts = async () => {
        requestAPI.sendRequest(requestAPI.asyncGetAllProducts, _callbackGetProducts);
    }

    const _callbackGetProducts = (status, data) => {
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

    const onProductInfo = (id) => navigate([MAIN_ROUTE, PRODUCTS_ROUTE].join("/") + `/${id}`);

    useMountEffect(_asyncGetProducts);

    return {
        products, onProductInfo
    }
}