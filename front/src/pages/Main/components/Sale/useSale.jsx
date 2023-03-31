import { useState } from "react";
import { useUserLogin, useValidate } from "../../../../hook/useStore";
import { asyncSaleProduct } from "../../../../core/api/APIrequest";
import { checkValid } from "../../../../core/model/dataAction";
import { Product } from "../../../../core/model/transport/Product";

export function useSale() {

    const initialState = {
        name: "",
        brand: "",
        model: "",
        price: "",
        image: "",
    }

    const fields = [
        {
            name: "name",
            nameRu: "Название",
        },
        {
            name: "brand",
            nameRu: "Марка",
        },
        {
            name: "model",
            nameRu: "Модель",
        },
        {
            name: "price",
            nameRu: "Стоимость",
        },
    ];
    
    const [form, setForm] = useState(initialState);
    
    const [error, setError] = useState("");
    const [isDndActive, setIsDndActive] = useState(false);
    
    const { signOut } = useValidate();
    const userLogin = useUserLogin();
    
    const handlerForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    
    const handlerImage = (e) => {
        let source = e.target;
        if (e.type === "drop"){
            source = e.dataTransfer;
        }
        const file = source.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setForm({ ...form, image: reader.result })
        }
        reader.readAsDataURL(file);
    }
 
    const _getSaleInfo = () => {
        const jsonSale = form;
        jsonSale["sellerName"] = userLogin;
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
                break;
            default:
                setForm(initialState);
                setError("");
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
        handlerImage(e);
    }


    return {
        form, error, handlerForm,
        _asyncSendSaleInfo, handlerImage,
        dndEnterOver, dndLeaveDrop, dndDrop, isDndActive,
        fields
    }
}