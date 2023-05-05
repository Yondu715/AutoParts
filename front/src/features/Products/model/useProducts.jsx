import { useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { Product } from "entities/product";
import { viewerModel } from "entities/viewer";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { dataAction } from "shared/lib/actions";

export function useProducts() {
    const { signOut } = viewerModel.useValidate();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const pathname = useResolvedPath().pathname;
    
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

    const onProductInfo = (id) => navigate(pathname + "/" + id);

    useMountEffect(_asyncGetProducts);

    return {
        products, onProductInfo
    }
}