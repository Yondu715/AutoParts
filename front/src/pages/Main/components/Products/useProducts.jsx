import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../../../hook/useValidate";
import { asyncGetAllProducts } from "../../../../core/api/APIrequest";
import { jsonToObjects } from "../../../../core/model/DataAction";
import { Product } from "../../../../core/model/transport/Product";
import { useMountEffect } from "../../../../hook/useMountEffect";

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

    const _onProductInfo = (id) => navigate("/main/products/" + id);

    useMountEffect(_getAllProducts);

    return {
        products, _onProductInfo
    }
}