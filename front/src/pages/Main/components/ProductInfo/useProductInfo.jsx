import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserLogin, useValidate } from "../../../../hook/useStore";
import { useMountEffect } from "../../../../hook/useMountEffect";
import { asyncAddToCart, asyncGetProductInfo } from "../../../../core/api/APIrequest";
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
        const response = await asyncGetProductInfo(id);
        const data = response.getBody();
        const status = response.getStatus();
        _callbackGetProductInfo(status, data);
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

    const _asyncAddToCart = async () => {
        const response = await asyncAddToCart(product);
        const status = response.getStatus();
        _callbackAddCart(status);
    }

    const _callbackAddCart = (status) => {
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
        product, _asyncAddToCart, productAdded,
        userLogin, openChat, chatIsOpen, error,
        id
    }
}