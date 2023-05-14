import { useState } from "react";
import { dataAction } from "shared/lib/actions";
import { Product, productModel } from "entities/product";
import { viewerModel } from "entities/viewer";

export function useSale() {

    const initialState = {
        name: "",
        brand: "",
        model: "",
        price: "",
        image: null,
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

    const { saleProduct } = productModel.useModel();
    
    const userLogin = viewerModel.useUserLogin();
    
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
        if (!dataAction.checkValid(product.get())) {
            setError("Не все поля были заполнены");
            return;
        }
        return product;
    }

    const asyncSendSaleInfo = async () => {
        const product = _getSaleInfo();
        product && saleProduct(product.get());
        setForm(initialState);
        setError("");
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
        asyncSendSaleInfo, handlerImage,
        dndEnterOver, dndLeaveDrop, dndDrop, isDndActive,
        fields
    }
}