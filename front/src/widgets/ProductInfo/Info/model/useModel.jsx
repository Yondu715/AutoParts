import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productModel } from "entities/product";
import { viewerModel } from "entities/viewer";
import { useMountEffect } from "shared/lib/hooks";
import { PATH } from "shared/config";

export function useModel() {
    const [chatIsOpen, setChatIsOpen] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const userLogin = viewerModel.useUserLogin();

    const { getProductByIdAsync } = productModel.useModel();
    const product = productModel.useProduct(+id);

    const _asyncGetProductInfo = async () => {
        if (isNaN(id)) {
            navigate(PATH.notFound);
            return;
        }
        getProductByIdAsync(+id);
    }

    const openChat = () => {
        setChatIsOpen(true);
    }

    useMountEffect(_asyncGetProductInfo);

    return {
        product, userLogin, openChat, 
        chatIsOpen, id
    }
}