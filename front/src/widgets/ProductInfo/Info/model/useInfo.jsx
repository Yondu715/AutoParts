import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMountEffect } from "shared/lib/hooks";
import { requestAPI } from "shared/api";
import { productModel } from "entities/product";
import { MAIN_ROUTE, PRODUCTS_ROUTE } from "shared/config";
import { viewerModel } from "entities/viewer";

export function useInfo() {
    const [chatIsOpen, setChatIsOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const userLogin = viewerModel.useUserLogin();
    const userId = viewerModel.useUserId();

    const { getProductByIdAsync } = productModel.useModel();
    const product = productModel.useProduct(Number(id));


    const _asyncGetProductInfo = async () => {
        if (isNaN(id)) {
            navigate([MAIN_ROUTE, PRODUCTS_ROUTE].join("/"));
            return;
        }
        getProductByIdAsync(Number(id));
    }

    const openChat = () => {
        setChatIsOpen(true);
    }

    useMountEffect(_asyncGetProductInfo);

    return {
        product, userId,
        userLogin, openChat, chatIsOpen,
        id
    }
}