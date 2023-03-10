import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useValidate } from "../../../../hook/useValidate";
import { asyncSaleProduct } from "../../../../core/api/APIrequest";
import { checkValid } from "../../../../core/model/DataAction";
import { Product } from "../../../../core/model/transport/Product";
import { AUTH_ROUTE, LS_LOGIN } from "../../../../utils/consts";

export function useSale() {

    const initialForm = {
        name: "",
        brand: "",
        model: "",
        price: "",
    }
    
    const [form, setForm] = useState(initialForm);
    const handlerForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const [error, setError] = useState("");
    const [image, setImage] = useState();
    const [isDndActive, setIsDndActive] = useState(false);

    const navigate = useNavigate();
    const { signOut } = useValidate();

    const _getImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const _getSaleInfo = () => {
        const jsonSale = form;
        jsonSale["sellerName"] = localStorage.getItem(LS_LOGIN);
        jsonSale["image"] = image;
        if (jsonSale["price"] !== "") Number(jsonSale["price"]);
        const product = new Product(jsonSale);
        return product;
    }

    const _asyncSendSaleInfo = async () => {
        const product = _getSaleInfo();
        if (!checkValid(product)) {
            setError("Не все поля были заполнены");
            return;
        }
        const response = await asyncSaleProduct(product);
        const status = response.getStatus();
        _callbackSaleInfo(status);
    }

    const _callbackSaleInfo = (status) => {
        switch (status) {
            case 401:
                signOut();
                navigate(AUTH_ROUTE);
                break;
            default:
                setForm(initialForm);
                setError("");
                setImage();
                break;
        }
    }

    const dndEnterOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDndActive(true);
    }

    const dndLeaveDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDndActive(false);
    }

    const dndDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDndActive(false);
        const dt = e.dataTransfer;
        const file = dt.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    return {
        form, error, image, handlerForm,
        _getImage, _asyncSendSaleInfo,
        dndEnterOver, dndLeaveDrop, dndDrop, isDndActive
    }
}