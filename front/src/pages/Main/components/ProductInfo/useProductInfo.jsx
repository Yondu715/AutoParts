import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserLogin, useValidate } from "../../../../hook/useUserStore";
import { useMountEffect } from "../../../../hook/useMountEffect";
import { requestAPI } from "../../../../core/api/request-api";
import { jsonToObjects } from "../../../../core/model/dataAction";
import { Product } from "../../../../core/model/transport/Product";
import { MAIN_ROUTE, PRODUCTS_ROUTE } from "../../../../utils/consts";

export function useProductInfo() {
    const [product, setProduct] = useState();
    const [chatIsOpen, setChatIsOpen] = useState(false);
    const [productAdded, setProductAdded] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { signOut } = useValidate();
    const userLogin = useUserLogin();


    const _asyncGetProductInfo = async () => {
        if (isNaN(id)) {
            navigate([MAIN_ROUTE, PRODUCTS_ROUTE].join("/"));
            return;
        }
        requestAPI.sendRequest(() => requestAPI.asyncGetProductInfo(id), _callbackGetProductInfo);
    }

    const _callbackGetProductInfo = (status, data) => {
        switch (status) {
            case 401:
                signOut();
                break;
            case 200:
                const product = jsonToObjects(data, Product);
                setProduct(product);
                break;
            default:
                break;
        }
    }

    const asyncAddProduct = async () => {
        requestAPI.sendRequest(() => requestAPI.asyncAddToCart(product.get()), _callbackAddProduct);
    }

    const _callbackAddProduct = (status) => {
        switch (status) {
            case 401:
                signOut();
                break;
            case 409:
                setError("Данный товар уже добавлен в корзину");
                break;
            case 200:
                setProductAdded(true);
                break;
            default:
                break;
        }
    }

    const openChat = () => {
        setChatIsOpen(true);
    }

    useMountEffect(_asyncGetProductInfo);

    return {
        product, asyncAddProduct, productAdded,
        userLogin, openChat, chatIsOpen, error,
        id
    }
}