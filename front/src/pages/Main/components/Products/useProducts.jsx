import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../../../hook/useValidate";
import { useMountEffect } from "../../../../hook/useMountEffect";
import { asyncGetAllProducts } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/DataAction";
import { Product } from "../../../../core/model/transport/Product";
import { MAIN_ROUTE, PRODUCTS_ROUTE } from "../../../../utils/consts";

export function useProducts() {
    const { signOut } = useValidate();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const _getAllProducts = async () => {
        const response = await asyncGetAllProducts();
        const data = response.getBody();
        const status = response.getStatus();
        _callbackGetProducts(status, data);
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

    const _onProductInfo = (id) => navigate([MAIN_ROUTE, PRODUCTS_ROUTE].join("/") + `/${id}`);

    useMountEffect(_getAllProducts);

    return {
        products, _onProductInfo
    }
}