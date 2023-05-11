import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { dataAction } from "shared/lib/actions";
import { Product } from "entities/product";
import { MAIN_ROUTE, PRODUCTS_ROUTE } from "shared/config";
import { viewerModel } from "entities/viewer";

export function useInfo() {
    const [product, setProduct] = useState();
    const [chatIsOpen, setChatIsOpen] = useState(false);
    const [productAdded, setProductAdded] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const userLogin = viewerModel.useUserLogin();
    const userId = viewerModel.useUserId();


    const _asyncGetProductInfo = async () => {
        if (isNaN(id)) {
            navigate([MAIN_ROUTE, PRODUCTS_ROUTE].join("/"));
            return;
        }
        requestAPI.sendRequest(() => requestAPI.asyncGetProductInfo(id), _callbackGetProductInfo);
    }

    const _callbackGetProductInfo = (status, data) => {
        switch (status) {
            case 200:
                const product = dataAction.jsonToObjects(data, Product);
                setProduct(product);
                break;
            default:
                break;
        }
    }

    const asyncAddProduct = async () => {
        requestAPI.sendRequest(() => requestAPI.asyncAddToCart(userId, product.get()), _callbackAddProduct);
    }

    const _callbackAddProduct = (status) => {
        switch (status) {
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