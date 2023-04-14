import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMountEffect } from "../../../shared/hooks";
import { requestAPI } from "../../../shared/api";
import { dataAction } from "../../../shared/lib";
import { Product } from "../../../shared/transport";
import { viewerModel } from "../../../entities/viewer";
import { MAIN_ROUTE, PRODUCTS_ROUTE } from "../../../shared/config";

export function useProducts() {
    const { signOut } = viewerModel.useValidate();
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
                const products = dataAction.jsonToObjects(data, Product);
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